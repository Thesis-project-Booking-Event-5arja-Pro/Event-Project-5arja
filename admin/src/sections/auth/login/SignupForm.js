import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../login/firebase";

// ----------------------------------------------------------------------

    const  SignupForm=() =>{
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
const [submitButtonDisabled,setSubmitButtonDisabled]=useState(false)
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = () => {
    console.log(errorMsg,'hi');
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
        setSubmitButtonDisabled(false);
       
    navigate('/dashboard', { replace: true });
  }).catch((err)=>{
    setErrorMsg(err.message);
    console.log(err.message,"hhhh");
  });

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          onChange={(e)=>setPassword(e.target.value)}
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
<text>{errorMsg}</text>
      {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        create account 
      </LoadingButton> */}
     <button onClick={handleClick}>create</button>
    </>
  );
}}
export default SignupForm;