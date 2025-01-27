import React, { useState } from 'react';
import Form from './components/Form/Form';
import UserList from './components/UserList/UserList';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #e9ecef;
  }

  h1 {
    text-align: center;
    color: #007bff;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const App: React.FC = () => {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>Formulário de Cadastro</h1>
        <Form onReload={handleReload} />
        <UserList reload={reload} />
      </Container>
    </>
  );
};

export default App;

export {};
