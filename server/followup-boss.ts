import axios from 'axios';

interface FUBLead {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  source: string;
  assignedTo?: string;
  customFields?: Record<string, any>;
}

export class FollowUpBossService {
  private fubEmail: string = 'mackenzie.siek1@followupboss.me';

  constructor() {
    // Email-to-lead service will be configured if needed
  }

  async createLead(leadData: FUBLead): Promise<any> {
    try {
      // Send lead directly to Follow up Boss webhook
      const webhookData = {
        first_name: leadData.firstName,
        last_name: leadData.lastName || '',
        email: leadData.email || '',
        phone: leadData.phone || '',
        message: leadData.message || '',
        source: leadData.source || 'Website'
      };

      console.log('Sending lead to Follow up Boss:', webhookData);

      const response = await axios.post('https://api.followupboss.com/v1/webhooks/sources/MackenzieSiek.com', webhookData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Successfully sent lead to Follow up Boss:', response.status);
      return { success: true, status: response.status };
    } catch (error: any) {
      console.error('Failed to send lead to Follow up Boss:', error.response?.data || error.message);
      
      // Fallback: Log lead information for manual processing
      console.log('=== FALLBACK - NEW LEAD FOR FOLLOW UP BOSS ===');
      console.log(`Name: ${leadData.firstName} ${leadData.lastName || ''}`);
      console.log(`Email: ${leadData.email || 'Not provided'}`);
      console.log(`Phone: ${leadData.phone || 'Not provided'}`);
      console.log(`Source: ${leadData.source}`);
      console.log(`Message: ${leadData.message || 'No message'}`);
      console.log(`Send to: ${this.fubEmail}`);
      console.log('===============================================');
      
      return { success: false, error: error.message };
    }
  }

  async createContactFormLead(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    interest: string;
    neighborhoods: string;
    message: string;
    agentName: string;
  }): Promise<any> {
    return this.createLead({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: `Interest: ${data.interest}\nNeighborhoods: ${data.neighborhoods}\nMessage: ${data.message}`,
      source: 'SRG Agent Marketing',
      customFields: {
        interest: data.interest,
        neighborhoods: data.neighborhoods,
        agent: data.agentName
      }
    });
  }

  async createSellerGuideLead(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    agentName: string;
  }): Promise<any> {
    return this.createLead({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: `Downloaded Seller's Guide. Property Address: ${data.address}`,
      source: 'SRG Agent Marketing',
      customFields: {
        leadType: 'Seller',
        propertyAddress: data.address,
        agent: data.agentName,
        downloadedGuide: 'Stone Selling System Guide'
      }
    });
  }
}

export const followUpBossService = new FollowUpBossService();