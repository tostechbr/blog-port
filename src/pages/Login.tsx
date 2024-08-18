// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     const response = await fetch('http://localhost:5000/users');
//     const users = await response.json();
    
//     const user = users.find((u: any) => u.email === email && u.password === password);
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//       navigate('/');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   const handleRegister = async () => {
//     const response = await fetch('http://localhost:5000/users', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
//     const newUser = await response.json();
//     localStorage.setItem('user', JSON.stringify(newUser));
//     navigate('/');
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input 
//         type="email" 
//         value={email} 
//         onChange={(e) => setEmail(e.target.value)} 
//         placeholder="Email" 
//       />
//       <input 
//         type="password" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} 
//         placeholder="Password" 
//       />
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }
