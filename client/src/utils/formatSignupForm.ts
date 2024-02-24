import { SignupProps } from "@/components/types";

export function formatSignupForm(form: SignupProps) {
  return {
    fullName: form.full_name,
    email: form.email,
    password: form.password,
    confirmPassword: form.confirm_password
  }
}