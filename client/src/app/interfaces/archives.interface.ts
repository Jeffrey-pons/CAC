export interface Archive {
  _id: string;
  date: number;
  artist: string;
  title?: string;
  month?: string;
  image?: string[];
  description?: string;
  rencontretext?: string;
  type?: string;
  editMode?: boolean;
}

export interface ArchiveResponse {
  ArchivesData: Archive[];
}
