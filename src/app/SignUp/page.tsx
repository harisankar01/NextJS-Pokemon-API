'use client'
import React from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@mui/material';

import { getAuth ,createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getApp } from '@/services/db';
import { useRouter } from 'next/navigation'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  width: '600px',
  margin: '20px auto',
}));

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
}));

const Signup = () => {

  const router = useRouter()
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const app = getApp();
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        router.push('/');
      } catch (error) {
        console.log('Signup error:', error);
      }
    },
  });

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <StyledPaper elevation={15}>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >
                <LockOutlinedIcon  />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5">Sign Up</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">Please fill this form to create an account!</Typography>
            </Grid>
            <StyledForm onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                placeholder="Enter your name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                label="Email"
                placeholder="Enter your email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                placeholder="Enter your password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              <Grid container justifyContent="center">
                <Grid item>
                    <Button type="submit" variant="contained" color="primary">
                      Sign up
                    </Button>
                </Grid>
              </Grid>
            </StyledForm>
          </Grid>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default Signup;
