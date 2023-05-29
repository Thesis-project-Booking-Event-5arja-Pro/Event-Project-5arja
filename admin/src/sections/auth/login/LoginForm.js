import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../login/firebase";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitButtonDisabled,setSubmitButtonDisabled]=useState(false)
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleClick = () => {
    signInWithEmailAndPassword(auth, email, password) .then(async (res) => {
      setSubmitButtonDisabled(false);
      navigate('/dashboard', { replace: true });
    })
    .catch((err) => {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    });
  
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(text) => setEmail(text)}/>

        <TextField
          name="password"
          label="Password"
          onChange={(text)=>setPassword(text)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login {errorMsg}
      </LoadingButton>
    </>
  );
}
