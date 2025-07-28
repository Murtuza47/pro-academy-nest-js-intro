export class ProfileDto {
  id: number;
  first_name?: string;
  last_name?: string;
  gender?: 'male' | 'female' | null;
  date_of_birth?: Date;
  bio?: string;
}
