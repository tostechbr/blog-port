import { Box, Typography } from '@mui/material';

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
      <Typography
        variant="h4"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Post
      </Typography>
    </Box>
  );
}
