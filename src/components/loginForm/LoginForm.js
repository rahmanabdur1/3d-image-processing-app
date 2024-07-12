"use client";

import { login } from "@/lib/action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard"); // Redirect to dashboard or appropriate page after login
    }
  }, [state?.success, router]);

  return (
    <Box 
      component="form" 
      action={formAction}
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      width="300px"
      margin="auto"
    >
         <h1>Login Form</h1>
      <TextField 
        id="username" 
        label="Username" 
        name="username" 
        variant="outlined" 
        margin="normal"
        fullWidth
      />
      <TextField 
        id="password" 
        label="Password" 
        name="password" 
        type="password" 
        variant="outlined" 
        margin="normal"
        fullWidth
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        margin="normal"
        fullWidth
      >
        Login
      </Button>
      {state?.error && <Box color="red">{state.error}</Box>}
      <Box marginTop="5px">
        <Link 
          component={NextLink} 
          href="/register" 
          color="secondary" 
          sx={{ textDecoration: 'none' }}
        >
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
