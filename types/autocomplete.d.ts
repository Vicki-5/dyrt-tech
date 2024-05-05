interface AutocompleteCampground {
  id: number;
  name: string;
  region: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  photos_count: number;
  reviews_count: number;
  slug: string;
  videos_count: number;
  type: string;
  photoUrl: string;
  region_name: string;
}
