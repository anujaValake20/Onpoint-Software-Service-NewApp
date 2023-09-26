import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Paper, Link, InputAdornment, IconButton, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Register from './Register'


const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showpassword, setshowpassword] = useState(false)


  const location = useLocation();
  const isLoginPage = location.pathname === '/Login'

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.108:8087/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {

        console.log('Login successful');
      } else {
        // Handle login error
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while logging in.');
    }
  };

  const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px', // Add border radius to the text field
    },
    marginBottom: theme.spacing(2), // Add spacing between text fields
  }));

  const StyledButton = styled(Button)({
    borderRadius: '10px',
  });

  const togglePasswordVisibility = () => {
    setshowpassword(!showpassword);
  };

  return (
    <div>
      
      <Grid container spacing={3} style={{margin:0}}>
        <Grid item xs={12} sm={5} style={{ padding: '40px' }}>
          <Paper elevation={0} style={{ padding: '10px' }}>
            <img
              src='https://img1.wsimg.com/private_label/545879/desktopLogo.ba6e73e6336f796884d34fbef0f04487.png'
              alt="Logo"
              style={{
                width: '100px', // Adjust the size as needed
                display: 'block',
                padding: '20px',
                margin: '0 auto',
              }}
            />
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <h3 style={{ fontWeight: 'lighter' }}>to get access to your files</h3>
            <form>
              <StyledTextField
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                value={email}
                style={{ marginBottom: '10px' }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Link href="#" style={{ display: 'block', textAlign: 'right', marginTop: '5px' }}>
                Forgot your Password?
              </Link>
              <StyledTextField
                label="Password"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showpassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="keepLoggedIn"
                      color="primary"
                    />
                  }
                  label="Keep me logged in"
                  style={{ marginBottom: '20px' }}
                />
              </FormGroup>
              <StyledButton
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                onClick={handleLogin}
              >
                Log in
              </StyledButton>
              <Typography variant="body2" style={{ margin: '16px 0' }}>Don't have an account?
                <Link component={RouterLink} to="/Register">
                  Register
                </Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7} style={{ overflow: 'hidden', padding: 0, margin: 0 }}>
          <img src='https://wallpapercave.com/wp/wp9549960.jpg' alt="Background" style={{ width: '100%', height: '100vh', objectFit: 'cover', maxHeight: '100vh',marginBottom:0 }} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Login;
