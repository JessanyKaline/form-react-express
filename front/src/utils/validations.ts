export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateName = (name: string): boolean => {
  const re = /^[a-zA-Z\s]+$/;
  return re.test(name);
};

export const validateCep = (cep: string): boolean => {
  const re = /^[0-9]{5}-?[0-9]{3}$/;
  return re.test(cep);
};
