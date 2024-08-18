import { Box } from '@mui/material';

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'var(--gray-800)',
        display: 'flex',
        justifyContent: 'center',
        paddingY: '1.25rem',
      }}
    >
      <Box
        component="img"
        src="https://via.placeholder.com/150x50.png?text=Ignite+Logo" // URL de logo genérico
        alt="Logotipo do Ignite"
        sx={{
          height: '2rem',
        }}
      />
    </Box>
  );
}