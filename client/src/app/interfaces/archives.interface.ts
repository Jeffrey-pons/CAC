export interface Archive {
  date: number;
  artist: string;
  title: string;
  month: string;
  image: string[];
  description: string;
  rencontretext: string;
  type: string;
}

export interface ArchiveResponse {
  archivesData: Archive[];
}
