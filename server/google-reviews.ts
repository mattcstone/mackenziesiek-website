import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

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
    // Try multiple methods to get credentials
    let credentials: any = null;
    
    // Method 1: Environment variable
    if (process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
      try {
        credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);
        console.log('Using Google credentials from environment variable');
      } catch (error) {
        console.warn('Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS from env:', error);
      }
    }
    
    // Method 2: Local file
    if (!credentials) {
      try {
        const credPath = path.join(process.cwd(), 'attached_assets', 'srg-reviews-b0511a5f6a0e.json');
        if (fs.existsSync(credPath)) {
          const credFileContent = fs.readFileSync(credPath, 'utf8');
          credentials = JSON.parse(credFileContent);
          console.log('Using Google credentials from local file');
        }
      } catch (error) {
        console.warn('Failed to load credentials from file:', error);
      }
    }

    if (!credentials) {
      console.warn('Google credentials not found - Google reviews will be disabled');
      this.initialized = false;
      return;
    }

    try {
      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: [
          'https://www.googleapis.com/auth/business.manage',
          'https://www.googleapis.com/auth/plus.business.manage'
        ],
      });

      // Use the account management API
      this.mybusiness = google.mybusinessaccountmanagement({
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
      console.log(`Attempting to fetch reviews for profile ${profileId} mentioning ${agentName}`);
      
      // Try multiple API endpoints to get reviews
      let reviews: any[] = [];
      
      try {
        // First, let's list accounts to find the correct account structure
        const accountsResponse = await this.mybusiness.accounts.list();
        console.log('Available accounts:', accountsResponse.data.accounts?.map(acc => acc.name));
        
        if (accountsResponse.data.accounts && accountsResponse.data.accounts.length > 0) {
          const accountName = accountsResponse.data.accounts[0].name;
          console.log(`Using account: ${accountName}`);
          
          // Now try to get location reviews using the correct account path
          try {
            const locationsAPI = google.mybusinessbusinessinformation({
              version: 'v1',
              auth: this.auth,
            });
            
            const response = await locationsAPI.accounts.locations.list({
              parent: accountName,
            });
            
            console.log('Available locations:', response.data.locations?.map(loc => ({ name: loc.name, title: loc.title })));
            
            // Find the location that matches our profile ID
            const targetLocation = response.data.locations?.find(loc => 
              loc.name?.includes(profileId) || loc.locationKey?.placeId === profileId
            );
            
            if (targetLocation) {
              console.log(`Found target location: ${targetLocation.name}`);
              
              // Get reviews for this location
              const reviewsResponse = await locationsAPI.accounts.locations.reviews.list({
                parent: targetLocation.name!,
              });
              
              reviews = reviewsResponse.data.reviews || [];
              console.log(`Found ${reviews.length} total reviews via business API`);
            } else {
              console.log('Target location not found, trying direct profile ID approach');
              
              // Try direct approach with profile ID
              const directResponse = await locationsAPI.accounts.locations.reviews.list({
                parent: `${accountName}/locations/${profileId}`,
              });
              
              reviews = directResponse.data.reviews || [];
              console.log(`Found ${reviews.length} total reviews via direct approach`);
            }
          } catch (locationError) {
            console.warn('Location API failed:', locationError);
          }
        }
      } catch (accountError) {
        console.warn('Account listing failed:', accountError);
      }
      
      // Filter reviews that mention the agent name (case insensitive)
      const agentReviews = reviews.filter((review: any) => {
        const comment = review.comment || review.text?.text || '';
        return comment.toLowerCase().includes(agentName.toLowerCase());
      });

      console.log(`Found ${agentReviews.length} reviews mentioning ${agentName}`);

      // Transform to our format
      return agentReviews.map((review: any) => ({
        reviewId: review.name?.split('/').pop() || review.reviewId || Math.random().toString(),
        reviewer: {
          displayName: review.reviewer?.displayName || review.authorAttribution?.displayName || 'Anonymous',
          profilePhotoUrl: review.reviewer?.profilePhotoUrl || review.authorAttribution?.photoUri,
        },
        starRating: review.starRating || review.rating || 'FIVE',
        comment: review.comment || review.text?.text || '',
        createTime: review.createTime || review.publishTime || new Date().toISOString(),
        updateTime: review.updateTime || review.updateTime || new Date().toISOString(),
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