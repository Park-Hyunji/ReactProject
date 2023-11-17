import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const SignUp = ({ onSignUp }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false); // 회원가입 성공 여부 상태
  const navigate = useNavigate(); // navigate로 변경

  const handleSignUp = () => {
    // 새로운 사용자 정보를 처리
    const newUser = {
      id: newUsername,
      password: newPassword,
      email: newEmail,
    };

    // 회원 가입 처리 함수 호출
    onSignUp(newUser);

    // 회원 가입 후 입력 필드 초기화
    setNewUsername('');
    setNewPassword('');
    setNewEmail('');

    // 회원가입 성공 메시지를 표시
    setIsSignUpSuccess(true);

    // 로그인 화면으로 이동
    navigate('/'); // navigate로 변경
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

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" style={{ fontFamily: 'TAEBAEK', fontWeight: 'bold', fontSize: '30px', color: 'black' }}>
            SIGN UP
          </Typography>
          
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="text" placeholder="아이디" 
              value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
              name="email"
              autoComplete="email"
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              type="password" placeholder="비밀번호" 
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="text" placeholder="이메일 주소" 
              value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
              name="email"
              autoComplete="email"
              autoFocus
            />
            
            <Button
              onClick={handleSignUp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              회원 가입 완료
            </Button>
            {isSignUpSuccess && <p>회원가입이 완료되었습니다.</p>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
   
  );
};

export default SignUp;
