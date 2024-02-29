export function formatUser(user: any) {
  return {
    displayName: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
    isAnonymous: user.isAnonymous,
    uid: user.uid,
  };
}
