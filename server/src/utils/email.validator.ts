export function emailValidator(email: string | undefined) {
  let reg =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

  if (email !== undefined) {
    return reg.test(email)
  } else {
    return null
  }

}