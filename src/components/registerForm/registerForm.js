"use client";

import { register } from "@/lib/action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import NextLink from 'next/link';

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
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
         <h1>Register Form</h1>
      <TextField
        id="username"
        label="Username"
        name="username"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        id="email"
        label="Email"
        name="email"
        type="email"
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
      <TextField
        id="passwordRepeat"
        label="Password Again"
        name="passwordRepeat"
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
        Register
      </Button>
      {state?.error && <Box color="red">{state.error}</Box>}
      <Box marginTop="5px">
        <Link 
         component={NextLink} 
          href="/login" 
          color="secondary" 
          sx={{ textDecoration: 'none' }}
        >
          {"Already have an account?"} <b>Login</b>
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
