export interface CollectionPermanente {
  _id: string;
  title: string;
  image: string;
  artist: string;
  description: string;
  dateOfExposition: string;
  type: string;
  editMode?: boolean;
}

export interface ArtWorkResponse {
  artWorkData: CollectionPermanente[];
}
