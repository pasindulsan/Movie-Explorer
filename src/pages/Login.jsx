import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To store error message
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'user' && password === '1234') {
      navigate('/home');
    } else {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 100 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>

      {/* Error message */}
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <TextField
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <Button 
              onClick={() => setShowPassword(!showPassword)} 
              size="small" 
              sx={{ position: 'absolute', right: 10, top: 10 }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          ),
        }}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={!username || !password} // Disable button if fields are empty
      >
        Login
      </Button>
    </Container>
  );
}
