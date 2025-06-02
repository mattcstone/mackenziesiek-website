import { google } from 'googleapis';
import axios from 'axios';

interface GoogleReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: string;
  comment: string;
  createTime: string;
  updateTime: string;
}

export class GoogleOAuthReviewsService {
  private oauth2Client: any;
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || '60115906243-6tjj7h2siv156f1sbq5s1bl3qsuohbni.apps.googleusercontent.com';
    this.clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || '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';
    
    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      'http://localhost:5000/auth/google/callback'
    );
    
    console.log('Google OAuth Reviews service initialized');
  }

  getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/business.manage'
    ];
    
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async setCredentials(code: string): Promise<void> {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    console.log('OAuth tokens set successfully');
  }

  async getBusinessReviews(accountId: string, locationId: string): Promise<GoogleReview[]> {
    try {
      const mybusiness = google.mybusinessbusinessinformation({
        version: 'v1',
        auth: this.oauth2Client
      });

      // Get reviews for the specific location
      const response = await mybusiness.accounts.locations.reviews.list({
        parent: `accounts/${accountId}/locations/${locationId}`,
      });

      if (response.data.reviews) {
        console.log(`Found ${response.data.reviews.length} reviews from Business Profile API`);
        
        return response.data.reviews.map((review: any) => ({
          reviewId: review.name?.split('/').pop() || Math.random().toString(),
          reviewer: {
            displayName: review.reviewer?.displayName || 'Anonymous',
            profilePhotoUrl: review.reviewer?.profilePhotoUrl
          },
          starRating: review.starRating || 'FIVE',
          comment: review.comment || '',
          createTime: review.createTime || new Date().toISOString(),
          updateTime: review.updateTime || new Date().toISOString()
        }));
      }

      return [];
    } catch (error) {
      console.error('Error fetching business reviews:', error);
      return [];
    }
  }

  async getReviewsMentioningAgent(agentName: string): Promise<GoogleReview[]> {
    try {
      // First, we need to get the account and location IDs
      // For now, we'll use the known Stone Realty Group location ID
      const accountId = '17917789645435239761'; // Your business profile ID
      const locationId = '17917789645435239761';
      
      const allReviews = await this.getBusinessReviews(accountId, locationId);
      
      console.log(`Searching ${allReviews.length} business reviews for mentions of "${agentName}"`);
      
      // Filter reviews that mention the agent name
      const mentioningAgent = allReviews.filter(review => {
        const hasMatch = review.comment.toLowerCase().includes(agentName.toLowerCase());
        if (hasMatch) {
          console.log(`Found business review mentioning ${agentName} by ${review.reviewer.displayName}: "${review.comment.substring(0, 100)}..."`);
        }
        return hasMatch;
      });
      
      console.log(`Found ${mentioningAgent.length} business reviews mentioning ${agentName}`);
      return mentioningAgent;
    } catch (error) {
      console.error('Error getting reviews mentioning agent from Business Profile:', error);
      return [];
    }
  }
}

export const googleOAuthReviewsService = new GoogleOAuthReviewsService();