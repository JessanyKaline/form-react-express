import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUser } from '../../services/api';
import { ListContainer, Table, TableHeader, TableRow, TableCell, EditButton, Input } from './UserList.styles';

interface User {
  id: number;
  name: string;
  email: string;
  cep: string;
}

interface UserListProps {
  reload: boolean;
}

const UserList: React.FC<UserListProps> = ({ reload }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsersData();
  }, [reload]);

  const fetchUsersData = async () => {
    try {
      const users = await fetchUsers();
      setUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user });
  };

  const handleSaveClick = async (user: User) => {
    if (editedUser) {
      try {
        await updateUser(user.id, editedUser);
        fetchUsersData();
        setEditingUserId(null);
        setEditedUser(null);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      const { name, value } = e.target;
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  return (
    <ListContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>CEP</TableHeader>
            <TableHeader>Ações</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {editingUserId === user.id ? (
                  <Input
                    type="text"
                    name="name"
                    value={editedUser?.name || ''}
                    onChange={handleChange}
                  />
                ) : (
                  user.name
                )}
              </TableCell>
              <TableCell>
                {editingUserId === user.id ? (
                  <Input
                    type="email"
                    name="email"
                    value={editedUser?.email || ''}
                    onChange={handleChange}
                  />
                ) : (
                  user.email
                )}
              </TableCell>
              <TableCell>
                {editingUserId === user.id ? (
                  <Input
                    type="text"
                    name="cep"
                    value={editedUser?.cep || ''}
                    onChange={handleChange}
                  />
                ) : (
                  user.cep
                )}
              </TableCell>
              <TableCell>
                {editingUserId === user.id ? (
                  <EditButton onClick={() => handleSaveClick(user)}>Salvar</EditButton>
                ) : (
                  <EditButton onClick={() => handleEditClick(user)}>Editar</EditButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ListContainer>
  );
};

export default UserList;
