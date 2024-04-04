export interface Admin  {
  _id: string;
  name: string;
  role: string;
  email: string;
}

export interface AdminResponse {
  adminData: Admin[];
}
