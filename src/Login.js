// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomePage from './homePage';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import boogie from './sangsangbugi-coding.png'

const Login = ({ Loginuser, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate를 사용

  const handleLogin = () => {
    const user = users.find((u) => u.id === username && u.password === password);
    if (user) {
      Loginuser(true);
      navigate("./main"); // 로그인 후 /main으로 이동
    } else {
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };

  const defaultTheme = createTheme();

  return (

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <img src={boogie} ></img>
            
            
          
          <Typography component="h1" variant="h4" style={{ fontFamily: 'TAEBAEK', fontWeight: 'bold', fontSize: '30px', color: 'black' }}>
            LOGIN
          </Typography>
          
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="text" placeholder="아이디" 
              value={username} onChange={(e) => setUsername(e.target.value)}
              name="email"
              autoComplete="email"
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              type="password" placeholder="비밀번호" 
              value={password} onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            
            <Button
              onClick={handleLogin}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>

            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
};

export default Login;