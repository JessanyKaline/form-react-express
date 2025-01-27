import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser } from '../../services/api';
import { validateEmail, validateName, validateCep } from '../../utils/validations';
import { FormContainer, Input, Button, ErrorMessage } from './Form.styles';

interface User {
  id?: number;
  name: string;
  email: string;
  cep: string;
}

interface FormProps {
  onReload: () => void;
}

const Form: React.FC<FormProps> = ({ onReload }) => {
  const [user, setUser] = useState<User>({ name: '', email: '', cep: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [backendError, setBackendError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createUser(user);
      onReload();
      setUser({ name: '', email: '', cep: '' });
      setErrors({});
      setBackendError(null);
    } catch (error: any) {
      console.error('Error creating user:', error);
      setBackendError(error.response?.data?.error || 'Erro ao criar usuário');
    }
  };

  const validateForm = (user: User) => {
    const errors: { [key: string]: string } = {};
    if (!validateName(user.name)) errors.name = 'Nome inválido';
    if (!validateEmail(user.email)) errors.email = 'Email inválido';
    if (!validateCep(user.cep)) errors.cep = 'CEP inválido';
    return errors;
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Nome"
        value={user.name}
        onChange={handleChange}
      />
      {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      <Input
        type="text"
        name="cep"
        placeholder="CEP"
        value={user.cep}
        onChange={handleChange}
      />
      {errors.cep && <ErrorMessage>{errors.cep}</ErrorMessage>}
      <Button type="submit">Enviar</Button>
      {backendError && <ErrorMessage>{backendError}</ErrorMessage>}
    </FormContainer>
  );
};

export default Form;
