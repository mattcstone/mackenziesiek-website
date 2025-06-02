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
    // Log lead information for Follow up Boss integration
    console.log('=== NEW LEAD FOR FOLLOW UP BOSS ===');
    console.log(`Name: ${leadData.firstName} ${leadData.lastName || ''}`);
    console.log(`Email: ${leadData.email || 'Not provided'}`);
    console.log(`Phone: ${leadData.phone || 'Not provided'}`);
    console.log(`Source: ${leadData.source}`);
    console.log(`Message: ${leadData.message || 'No message'}`);
    if (leadData.customFields) {
      console.log(`Additional Info: ${JSON.stringify(leadData.customFields, null, 2)}`);
    }
    console.log(`Send to: ${this.fubEmail}`);
    console.log('===================================');
    
    // Return success status
    return { 
      success: true, 
      fubEmail: this.fubEmail,
      leadData: {
        name: `${leadData.firstName} ${leadData.lastName || ''}`,
        email: leadData.email,
        phone: leadData.phone,
        source: leadData.source,
        message: leadData.message
      }
    };
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
      source: 'Stone Realty Website - Contact Form',
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
      source: 'Stone Realty Website - Seller Guide Download',
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