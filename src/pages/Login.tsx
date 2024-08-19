import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';

export function AuthForm({ type }: { type: 'login' | 'register' }) {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    name: type === 'register' ? Yup.string().required('Nome é obrigatório') : Yup.string().notRequired(),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
    confirmPassword: type === 'register' 
      ? Yup.string()
        .oneOf([Yup.ref('password')], 'Senhas não conferem')
        .required('Confirmação de senha é obrigatória')
      : Yup.string().notRequired()
  });

  const handleRegister = async (values: any) => {
    const { name, email, password } = values;

    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();

    const userExists = users.some((user: any) => user.email === email);

    if (userExists) {
      alert('Usuário já existe!');
    } else {
      const newUser = { name, email, password };

      await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      alert('Registro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    }
  };

  const handleLogin = async (values: any) => {
    const { email, password } = values;

    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      navigate('/home');
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: 'var(--gray-700)' }} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} sx={{ backgroundColor: 'var(--gray-800)', padding: 4, borderRadius: '16px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'var(--gray-100)',
              borderRadius: '16px',
            }}
          >
            <Box
              sx={{ mb: 2, borderRadius: '8px' }}
            />
            <Typography component="h1" variant="h5" sx={{ mb: 2, color: 'var(--gray-100)' }}>
              {type === 'login' ? 'Entrar' : 'Registrar'}
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={type === 'login' ? handleLogin : handleRegister}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                  {type === 'register' && (
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="name"
                      label="Nome"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      InputProps={{
                        style: { color: 'var(--gray-100)', borderRadius: '8px' },
                      }}
                      InputLabelProps={{
                        style: { color: 'var(--gray-400)' },
                      }}
                    />
                  )}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      style: { color: 'var(--gray-100)', borderRadius: '8px' },
                    }}
                    InputLabelProps={{
                      style: { color: 'var(--gray-400)' },
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      style: { color: 'var(--gray-100)', borderRadius: '8px' },
                    }}
                    InputLabelProps={{
                      style: { color: 'var(--gray-400)' },
                    }}
                  />
                  {type === 'register' && (
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label="Confirmação de Senha"
                      type="password"
                      id="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      InputProps={{
                        style: { color: 'var(--gray-100)', borderRadius: '8px' },
                      }}
                      InputLabelProps={{
                        style: { color: 'var(--gray-400)' },
                      }}
                    />
                  )}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: 'var(--blue-500)',
                        color: 'var(--gray-100)',
                        borderRadius: '25px',
                        textTransform: 'none',
                        padding: '0.75rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: 'var(--blue-700)',
                        },
                      }}
                    >
                      {type === 'login' ? 'Login' : 'Registrar'}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              {type !== 'login' ? (
                <Button onClick={() => navigate('/login')} sx={{ color: 'var(--purple-500)' }}>
                  Já tem uma conta? Entrar
                </Button>
              ) : (
                <Button onClick={() => navigate('/register')} sx={{ color: 'var(--purple-500)' }}>
                  Não tem uma conta? Registrar
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
