export interface SignupProps {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface SigninProps {
  email: string;
  password: string;
}