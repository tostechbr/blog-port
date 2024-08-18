import React from 'react';
import { Box, Typography, Avatar, Button, Divider } from '@mui/material';
import { PencilLine } from 'phosphor-react';

export function Sidebar() {
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
          src="https://github.com/maykbrito.png"
          alt="Diego Fernandes"
          sx={{ width: 64, height: 64, border: '4px solid var(--gray-800)' }}
        />
        <Typography variant="h6" color="var(--gray-100)" sx={{ marginTop: 2 }}>
          Diego Fernandes
        </Typography>
        <Typography variant="body2" color="var(--gray-400)">
          Web Developer
        </Typography>
      </Box>

      <Divider sx={{ width: '100%', borderColor: 'var(--gray-600)', marginTop: 3 }} />

      <Button
        href="#"
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
    </Box>
  );
}
