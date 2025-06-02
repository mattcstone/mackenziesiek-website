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
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.FUB_API_KEY || '';
    this.apiUrl = process.env.FUB_API_URL || 'https://api.followupboss.com/v1';
    
    if (!this.apiKey) {
      console.warn('FUB_API_KEY not found - Follow up Boss integration disabled');
    }
  }

  async createLead(leadData: FUBLead): Promise<any> {
    if (!this.apiKey) {
      console.log('FUB API key not configured, skipping Follow up Boss integration');
      return null;
    }

    try {
      const response = await axios.post(
        `${this.apiUrl}/people`,
        {
          firstName: leadData.firstName,
          lastName: leadData.lastName || '',
          emails: leadData.email ? [{ value: leadData.email }] : [],
          phones: leadData.phone ? [{ value: leadData.phone }] : [],
          note: leadData.message || '',
          source: leadData.source,
          assignedTo: leadData.assignedTo,
          ...leadData.customFields
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Successfully created lead in Follow up Boss:', response.data.id);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create lead in Follow up Boss:', error.response?.data || error.message);
      // Don't throw error - we still want the local lead to be created
      return null;
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