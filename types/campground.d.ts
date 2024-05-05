interface Campground {
  id: string;
  type: string;
  links: Links;
  attributes: Attributes;
  relationships: Relationships;
}

interface Links {
  self: string;
}

interface Attributes {
  'access-types': string[];
  'accommodation-types': string[];
  'camper-types': string[];
  coordinates: Coordinates;
  latitude: number;
  longitude: number;
  elevation: number;
  'price-low': string;
  'price-low-cents': number;
  'price-low-currency': string;
  'price-high': string;
  'price-high-cents': number;
  'price-high-currency': string;
  'campsites-count': number;
  category: string;
  description: string;
  directions: string;
  'annotated-features': {[key: string]: AnnotatedFeature};
  email: string;
  name: string;
  'phone-number': string;
  'photo-url': string;
  rating: number;
  address: string;
  city: string;
  region: string;
  'region-name': string;
  'postal-code': string;
  slug: string;
  website: string;
  season: string;
  'time-zone': string;
  'nearest-city-name': string;
  'nearest-city-region-name': string;
  'bookmarks-count': number;
  'lists-count': number;
  'photos-count': number;
  'videos-count': number;
  'reviews-count': number;
  'one-star-reviews-count': number;
  'two-star-reviews-count': number;
  'three-star-reviews-count': number;
  'four-star-reviews-count': number;
  'five-star-reviews-count': number;
  'has-featured-photo': boolean;
  claimable: boolean;
  claimed: boolean;
  bookable: boolean;
  'managed-by-current-user': boolean;
  'permanently-closed': boolean;
  'ada-access': boolean;
  'alcohol-allowed': boolean;
  'big-rig-friendly': boolean;
  'drinking-water': boolean;
  'electric-amperage': number;
  'electric-hookups': boolean;
  'fires-allowed': boolean;
  firewood: boolean;
  free: boolean;
  market: boolean;
  'max-vehicle-length-ft': number;
  'mobile-service': boolean;
  'pets-allowed': boolean;
  'picnic-table': boolean;
  reservable: boolean;
  'sanitary-dump': boolean;
  'sewer-hookups': boolean;
  showers: boolean;
  toilets: boolean;
  trash: boolean;
  'water-hookups': boolean;
  wifi: boolean;
  'access-boat': boolean;
  'access-drive': boolean;
  'access-hike': boolean;
  'access-walk': boolean;
  'accommodation-cabin': boolean;
  'accommodation-dispersed': boolean;
  'accommodation-glamping': boolean;
  'accommodation-group': boolean;
  'accommodation-rv': boolean;
  'accommodation-tent': boolean;
  'accommodation-tent-cabin': boolean;
  'accommodation-horse': boolean;
  'accommodation-yurt': boolean;
  'accommodation-standard': boolean;
  'driveway-back-in': boolean;
  'driveway-pull-through': boolean;
  'verified-at': string;
  'external-api': string;
  'created-at': string;
  'blocked-dates': string[];
  'general-location': boolean;
}

interface Relationships {
  [key: string]: RelationshipLink;
}

interface RelationshipLink {
  links: Links;
}

interface Coordinates {
  type: string;
  coordinates: number[];
}

interface AnnotatedFeature {
  value: boolean;
}
