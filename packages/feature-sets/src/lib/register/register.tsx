import { Link as LinkRouter, useNavigate } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import YupPassword from 'yup-password'
import AuthLayout from '../auth-layout/auth-layout';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useAuthStore } from 'packages/cloud/src/hooks/useAuthStore';
import { useRegisterMutation } from 'data-access';
//import { registerUser } from '../../store/auth/thunks';

YupPassword(yup) // extend yup

const schema = yup.object({
  lastName: yup.string().required('Last name is required').min(3, 'More than 3 letters are required'),
  name: yup.string().required('Name is required').min(3, 'More than 3 letters are required'),
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup.string().required('Password is required')
    .min(8, 'Password must have more than 8 characters, It must have one lower case, one upper case and one number')
    .minLowercase(1, 'Password must have one lower case character')
    .minUppercase(1, 'Password must have one upper case character')
    .minNumbers(1, 'Password must have number character')
    .minSymbols(1, 'Password must have number one special character'),
}).required();


export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();

  const [registerMutation, { data, loading, error }] = useRegisterMutation(
    {}
  );

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      lastName: "",
      name: "",
      email: "",
      password: ""
    }
  });


  const onSubmit = async (data: any) => {
    const response = await registerMutation({ variables: data });
    signUp(response);
    navigate('/');
  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="name"
              placeholder='Name'
              fullWidth
              {...register("name")}
              error={errors.name ? true : false}
              helperText={errors.name?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Last name"
              type="lastName"
              placeholder='Last name'
              fullWidth
              {...register("lastName")}
              error={errors.lastName ? true : false}
              helperText={errors.lastName?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder='corrreo@gmail.com'
              fullWidth
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder='Password'
              fullWidth
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password?.message?.toString()}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={12}>
              <Button
                type='submit'
                variant='contained' fullWidth>
                Create Account
              </Button>
            </Grid>
            <Grid>

            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
            <Typography sx={{ mr: 1 }}>If you have account?</Typography>
            <Link
              component={LinkRouter}
              color="inherit"
              to="/auth/login">
              Sign In
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
