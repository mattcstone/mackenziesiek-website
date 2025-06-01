import { google } from 'googleapis';

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

interface ReviewResponse {
  reviews: GoogleReview[];
  nextPageToken?: string;
}

export class GoogleReviewsService {
  private auth: any;
  private mybusiness: any;
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
      console.warn('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not found - Google reviews will be disabled');
      this.initialized = false;
      return;
    }

    try {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);
      
      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/business.manage'],
      });

      this.mybusiness = google.mybusinessbusinessinformation({
        version: 'v1',
        auth: this.auth,
      });
      
      this.initialized = true;
      console.log('Google Reviews service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Auth:', error);
      this.initialized = false;
    }
  }

  async getReviewsMentioningAgent(profileId: string, agentName: string): Promise<GoogleReview[]> {
    if (!this.initialized) {
      console.log('Google Reviews service not initialized - returning empty array');
      return [];
    }

    try {
      // Get reviews from Google My Business
      const response = await this.mybusiness.accounts.locations.reviews.list({
        parent: `accounts/*/locations/${profileId}`,
      });

      const reviews = response.data.reviews || [];
      
      // Filter reviews that mention the agent name (case insensitive)
      const agentReviews = reviews.filter((review: any) => {
        const comment = review.comment || '';
        return comment.toLowerCase().includes(agentName.toLowerCase());
      });

      console.log(`Found ${agentReviews.length} reviews mentioning ${agentName}`);

      // Transform to our format
      return agentReviews.map((review: any) => ({
        reviewId: review.name?.split('/').pop() || '',
        reviewer: {
          displayName: review.reviewer?.displayName || 'Anonymous',
          profilePhotoUrl: review.reviewer?.profilePhotoUrl,
        },
        starRating: review.starRating || 'FIVE',
        comment: review.comment || '',
        createTime: review.createTime || new Date().toISOString(),
        updateTime: review.updateTime || new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Failed to fetch Google reviews:', error);
      // Return empty array instead of throwing to gracefully handle API issues
      return [];
    }
  }

  async getBusinessInfo(profileId: string) {
    if (!this.initialized) {
      throw new Error('Google Reviews service not initialized');
    }

    try {
      const response = await this.mybusiness.accounts.locations.get({
        name: `accounts/*/locations/${profileId}`,
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to fetch business info:', error);
      throw error;
    }
  }
}

export const googleReviewsService = new GoogleReviewsService();