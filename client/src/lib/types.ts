export interface SearchFormData {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  interest: string;
  neighborhoods: string;
  message: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface MarketStats {
  activeListings: number;
  medianPrice: string;
  avgDaysOnMarket: number;
}
