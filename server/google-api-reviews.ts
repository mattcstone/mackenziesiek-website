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

export class GoogleAPIReviewsService {
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = process.env.GOOGLE_BUSINESS_PROFILE_API_KEY || process.env.GOOGLE_MY_BUSINESS_API_KEY || 'AIzaSyCKO9DDGO1fXpiqx0CuZcy2tIi-0BmUuU0';
    
    if (this.apiKey) {
      console.log('Google API Reviews service initialized with API key');
    } else {
      console.warn('No Google API key found for reviews');
    }
  }

  async getReviewsForLocation(locationId: string): Promise<GoogleReview[]> {
    if (!this.apiKey) {
      console.warn('No API key available for Google reviews');
      return [];
    }

    try {
      // First, try to find the Place ID for Stone Realty Group
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Stone+Realty+Group+Charlotte+NC&key=${this.apiKey}`;
      const searchResponse = await axios.get(searchUrl);
      
      if (searchResponse.data.status === 'OK' && searchResponse.data.results.length > 0) {
        const placeId = searchResponse.data.results[0].place_id;
        console.log(`Found Place ID for Stone Realty Group: ${placeId}`);
        
        // Now get reviews using the Place ID
        const placesUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${this.apiKey}`;
        const response = await axios.get(placesUrl);
        
        if (response.data.status === 'OK' && response.data.result.reviews) {
          console.log(`Found ${response.data.result.reviews.length} total reviews for Stone Realty Group`);
          console.log('Sample review content:', response.data.result.reviews.slice(0, 2).map((r: any) => ({
            author: r.author_name,
            text: r.text ? r.text.substring(0, 100) + '...' : 'No text',
            rating: r.rating
          })));
          return response.data.result.reviews.map((review: any) => ({
            reviewId: review.time?.toString() || Math.random().toString(),
            reviewer: {
              displayName: review.author_name || 'Anonymous',
              profilePhotoUrl: review.profile_photo_url
            },
            starRating: review.rating?.toString() || '5',
            comment: review.text || '',
            createTime: new Date(review.time * 1000).toISOString(),
            updateTime: new Date(review.time * 1000).toISOString()
          }));
        }
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching reviews from Google API:', error);
      if (error.response) {
        console.error('API Error Response:', error.response.data);
      }
      return [];
    }
  }

  async getReviewsMentioningAgent(profileId: string, agentName: string): Promise<GoogleReview[]> {
    try {
      const allReviews = await this.getReviewsForLocation(profileId);
      
      console.log(`Searching ${allReviews.length} reviews for mentions of "${agentName}"`);
      
      // Filter reviews that mention the agent name (case insensitive)
      const mentioningAgent = allReviews.filter(review => {
        const hasMatch = review.comment.toLowerCase().includes(agentName.toLowerCase());
        if (hasMatch) {
          console.log(`Found review mentioning ${agentName} by ${review.reviewer.displayName}: "${review.comment.substring(0, 100)}..."`);
        }
        return hasMatch;
      });
      
      console.log(`Found ${mentioningAgent.length} reviews mentioning ${agentName}`);
      return mentioningAgent;
    } catch (error) {
      console.error('Error getting reviews mentioning agent:', error);
      return [];
    }
  }
}

export const googleAPIReviewsService = new GoogleAPIReviewsService();