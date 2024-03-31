export interface Mediation {
  _id: string;
  title: string;
  image: string;
  intro: string;
  subtitle: string;
  description: string;
  infosupp: string;
}

export interface MediationResponse {
  mediationData: Mediation[];
}
