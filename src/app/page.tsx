'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getApp } from '@/services/db';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AlertComponent from '@/components/Alert';
export default function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [Forgotemail, setEmail]= useState<string>("")
  const router = useRouter()
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    if(localStorage.getItem("Remember") && localStorage.getItem("accessToken"))
          router.push('/info')
  
  }, [])
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email: string = data.get('email') as string;
    const pwd: string = data.get('password') as string;
    try {
      if (rememberMe) {
        localStorage.setItem('Remember', "true");
      } else {
        localStorage.removeItem('Remember');
      }
      const res = await fetch("/api",{
        method: "POST",
        body: JSON.stringify({
          email: email,
          pwd: pwd,
        })
      }).then((d)=> d.json())
      
      if(res.status==="Success"){
        localStorage.setItem('userId',res.uid );
        localStorage.setItem('accessToken', res.token);
        console.log("Puhing");
        router.push(`/info?token=${res.token}`)
      }
      else{
        setSnackbarOpen(true);
        setSnackbarMessage('Check your credentials');
      }
    } catch (error) {
      console.log('Login error:', error);
      setSnackbarOpen(true);
      setSnackbarMessage('Check your credentials');
    }
  };

  const handleForgotPassword = async () => {
    if(!Forgotemail){
      setSnackbarOpen(true);
      setSnackbarMessage('Please type in the Email and try again');
    }
    try {
      const app = getApp();
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, Forgotemail);
      console.log('Password reset email sent');
    } catch (error) {
      console.log('Forgot password error:', error);
      setSnackbarOpen(true);
      setSnackbarMessage('Please type in the Email and try again');
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            label="Email Address"
            onChange={(e)=>setEmail(e.target.value)}
            required
            fullWidth
            name="email"
            autoComplete="email"
            autoFocus
          />
          <br />
          <TextField
            margin="normal"
            label="Password"
            type="password"
            required
            fullWidth
            name="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign in
          </Button>

          <Grid container>
            <Grid item xs>
              <Link style={{cursor:"pointer"}} variant="body2" onClick={handleForgotPassword}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
        <AlertComponent open={snackbarOpen} close={handleSnackbarClose} msg={snackbarMessage} severity={true} />
      </Box>
    </Container>
  );
}
