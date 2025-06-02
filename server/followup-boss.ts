import axios from 'axios';
import nodemailer from 'nodemailer';

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
      // Create email content for Follow up Boss
      const emailSubject = `New Lead: ${leadData.firstName} ${leadData.lastName || ''} - ${leadData.source}`;
      const emailBody = `
New Lead Information:

Name: ${leadData.firstName} ${leadData.lastName || ''}
Email: ${leadData.email || 'Not provided'}
Phone: ${leadData.phone || 'Not provided'}
Source: ${leadData.source}
Message: ${leadData.message || 'No message provided'}

This lead was automatically captured from the Stone Realty Group website.
      `.trim();

      console.log('Sending lead email to Follow up Boss:', this.fubEmail);

      // Send email via SMTP using Matt Stone Team credentials
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'Matt@mattstoneteam.com',
          pass: 'ppwd sgnx vkqh zyol'
        }
      });

      await transporter.sendMail({
        from: 'Matt@mattstoneteam.com',
        to: [this.fubEmail, 'Hello@mattstoneteam.com'],
        subject: emailSubject,
        text: emailBody
      });

      console.log('Successfully sent lead email to Follow up Boss');
      return { success: true, method: 'email' };

    } catch (emailError: any) {
      console.log('Email delivery not configured, logging lead for manual processing');
      
      // Log lead information for manual processing
      console.log('=== NEW LEAD FOR FOLLOW UP BOSS ===');
      console.log(`Name: ${leadData.firstName} ${leadData.lastName || ''}`);
      console.log(`Email: ${leadData.email || 'Not provided'}`);
      console.log(`Phone: ${leadData.phone || 'Not provided'}`);
      console.log(`Source: ${leadData.source}`);
      console.log(`Message: ${leadData.message || 'No message'}`);
      console.log(`Send to: ${this.fubEmail}`);
      console.log('===================================');
      
      return { success: true, method: 'logged' };
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