export interface NextExpo {
  titleDate: string;
  image: string;
  name: string;
  dateOfExpo: string;
  description: string;
  type: string;
}

export interface NextExpoResponse {
  nextExpoData: NextExpo[];
}