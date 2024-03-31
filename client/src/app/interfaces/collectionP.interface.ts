export interface CollectionPermanente {
  _id: string;
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