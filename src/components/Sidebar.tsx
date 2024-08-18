import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, Divider } from '@mui/material';
import { PencilLine } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca os dados do usuário armazenados no localStorage
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Remove os dados do usuário do localStorage
    localStorage.removeItem('loggedUser');
    // Redireciona para a página de login
    navigate('/login');
  };

  if (!user) {
    return null; // Ou exiba um loader ou algo do tipo
  }

  return (
    <Box
      component="aside"
      sx={{
        backgroundColor: 'var(--gray-800)',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 2,
      }}
    >
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
        sx={{
          width: '100%',
          height: '72px',
          objectFit: 'cover',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-36px',
        }}
      >
        <Avatar
          alt={user.name}
          sx={{
            width: 64,
            height: 64,
            border: '4px solid var(--gray-800)',
            backgroundColor: 'var(--green-500)',
            color: 'var(--white)',
            fontSize: '24px',
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6" color="var(--gray-100)" sx={{ marginTop: 2 }}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="var(--gray-400)">
          {user.email}
        </Typography>
      </Box>

      <Divider sx={{ width: '100%', borderColor: 'var(--gray-600)', marginTop: 3 }} />

      <Button
        onClick={() => navigate('/profile')}
        variant="outlined"
        startIcon={<PencilLine size={20} />}
        sx={{
          marginTop: 3,
          padding: '12px 24px',
          color: 'var(--green-500)',
          borderColor: 'var(--green-500)',
          borderRadius: 2,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'var(--green-500)',
            color: 'var(--white)',
            borderColor: 'var(--green-500)',
          },
        }}
      >
        Editar seu perfil
      </Button>


      {/* Botão de Sair */}
      <Button
        variant="outlined"
        startIcon={<PencilLine size={20} />}
        onClick={handleLogout}
        sx={{
          marginTop: 3,
          padding: '12px 24px',
          color: 'var(--red-500)',
          borderColor: 'var(--red-500)',
          borderRadius: 2,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'var(--red-500)',
            color: 'var(--white)',
            borderColor: 'var(--red-500)',
          },
        }}
      >
        Sair
      </Button>
    </Box>
  );
}
