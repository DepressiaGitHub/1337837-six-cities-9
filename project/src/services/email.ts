const AUTH_EMAIL = 'six-cities-email';

export type Email = string;

export const getEmail = (): Email => {
  const email = localStorage.getItem(AUTH_EMAIL);
  return email ?? '';
};

export const saveEmail = (email: Email): void => {
  localStorage.setItem(AUTH_EMAIL, email);
};

export const dropEmail = (): void => {
  localStorage.removeItem(AUTH_EMAIL);
};
