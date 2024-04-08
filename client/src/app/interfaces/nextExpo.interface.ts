export interface NextExpo {
  _id: string;
  titleDate: string;
  image: string;
  name: string;
  dateOfExpo: string;
  description: string;
  type: string;
  editMode?: boolean;

}

export interface NextExpoResponse {
  nextExpoData: NextExpo;

}

