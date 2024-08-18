import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Divider, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name);
      setEmail(parsedUser.email);
    }
  }, []);

  const handleSave = async () => {
    if (user) {
      const updatedUser = { ...user, name, email };

      // Atualizar os dados no db.json
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        // Atualiza os dados armazenados localmente
        localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
        navigate('/home');
      } else {
        console.error('Erro ao atualizar os dados do usuário');
      }
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: 'var(--gray-800)',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        margin: 'auto',
        marginTop: 8,
        maxWidth: '400px',
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
          alt={name}
          sx={{
            width: 64,
            height: 64,
            border: '4px solid var(--gray-800)',
            backgroundColor: 'var(--green-500)',
            color: 'var(--white)',
            fontSize: '24px',
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6" color="var(--gray-100)" sx={{ marginTop: 2 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="var(--gray-400)">
          {email}
        </Typography>
      </Box>

      <Divider sx={{ width: '100%', borderColor: 'var(--gray-600)', marginTop: 3 }} />

      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: 'var(--gray-700)',
            color: 'var(--gray-100)',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--gray-600)',
          },
        }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: 'var(--gray-700)',
            color: 'var(--gray-100)',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--gray-600)',
          },
        }}
      />
      
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSave}
        sx={{ marginTop: 3 }}
      >
        Salvar
      </Button>

      {/* Botão Voltar */}
      <Button
        variant="outlined"
        fullWidth
        onClick={handleBack}
        sx={{
          marginTop: 2,
          color: 'var(--gray-300)',
          borderColor: 'var(--gray-300)',
          '&:hover': {
            backgroundColor: 'var(--gray-700)',
            borderColor: 'var(--gray-500)',
          },
        }}
      >
        Voltar
      </Button>
    </Box>
  );
}
