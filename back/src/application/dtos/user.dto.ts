export interface CreateUserDTO {
  name: string;
  email: string;
  cep: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  cep?: string;
}
