export interface UserProfile {
  id: string;
  name: string;
  avatar: string | undefined;
  username: string;
  email: string;
  phone_number: string | undefined;
  address: string | undefined;
  type: string;
  status: string;
  email_verified_at: string;
  about: string | undefined;
  date_of_birth: string | undefined;
  gender: string | undefined;
  approved_at: string | undefined;
  created_at: string;
  updated_at: string;
}
