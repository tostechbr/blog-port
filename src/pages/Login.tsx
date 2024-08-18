import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Grid, Paper, Link } from '@mui/material';

export function AuthForm({ type }: { type: 'login' | 'register' }) {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().when('type', {
      is: 'register',
      then: schema => schema.required('Nome é obrigatório'),
      otherwise: schema => schema.notRequired(),
    }),
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'Senha deve ter no mínimo 6 caracteres')
      .required('Senha é obrigatória'),
    confirmPassword: Yup.string().when('type', {
      is: 'register',
      then: schema => schema
        .oneOf([Yup.ref('password')], 'Senhas não conferem')
        .required('Confirmação de senha é obrigatória'),
      otherwise: schema => schema.notRequired(),
    }),
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

      navigate('/home');
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
    <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
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
                    autoComplete="current-password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                )}
                <Box sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    {type === 'login' ? 'Login' : 'Registrar'}
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(type === 'login' ? '/register' : '/login')}
                    sx={{ mt: 2 }}
                  >
                    {type === 'login' ? 'Registrar' : 'Voltar'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}
