export interface CollectionPermanente {
  title: string;
  image: string;
  artist: string;
  description: string;
  dateOfExposition: string;
  type: string;
}

export interface ArtWorkResponse {
  artWorkData: CollectionPermanente[];
}