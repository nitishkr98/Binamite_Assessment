import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../common/navbar';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import { loginAction, signupAction } from '../../redux/reducers/user';

const initialState = {
  email: '',
  password: '',
};

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const [formState, setFormState] = useState('SIGNUP');
  const [formValues, setFormValues] = useState(initialState);
  const [formSubmit, setFormSubmit] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState({});

  const handleClose = () => {
    setMsg(null);
  };

  useEffect(() => {
    if (user) navigate('/profile');
  }, []);

  const handleChange = (e) => {
    let values = {
      [e.target.name]:
        e.target.name === 'email'
          ? e.target.value.toLowerCase()
          : e.target.value,
    };
    setFormValues({ ...formValues, ...values });
  };

  const checkValidation = (data) => {
    let err = {};
    for (const key in data) {
      if (data[key].length === 0) {
        err = { ...err, [key]: `${key} is a required field` };
      } else if (
        key === 'password' &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          data['password']
        )
      ) {
        err = {
          ...err,
          password: `Please enter password as per rules`,
        };
      } else if (
        key === 'email' &&
        !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(
          data['email']
        )
      ) {
        err = {
          ...err,
          email: `Please enter a valid email address`,
        };
      }
    }
    setError(err);
  };

  useEffect(() => {
    checkValidation(formValues);
  }, [formSubmit, formValues]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);
    if (Object.keys(error).length) return;
    if (formState === 'SIGNUP') {
      // create new user
      const res = dispatch(signupAction(formValues));
      if (res) return setMsg({ text: res, severity: 'error' });
      else navigate('/profile');
    } else if (formState === 'LOGIN') {
      // Login user
      const res = dispatch(loginAction(formValues));
      if (res) return setMsg({ text: res, severity: 'error' });
      else navigate('/profile');
    }
  };

  return (
    <Container
      maxWidth={'xl'}
      sx={{
        paddingX: '0px !important',
        minHeight: '100vh',
        backgroundColor: '#1A1A1A',
      }}
    >
      <Navbar setFormState={setFormState} />

      <Box
        pt={6}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          paddingX: '200px',
        }}
      >
        <Card sx={{ width: 350, borderRadius: '16px', marginBottom: '24px' }}>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <CardContent>
              <Typography variant="overline" display="block">
                Type something here
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '40px',
                  lineHeight: '45px',
                  marginBottom: '8px',
                }}
              >
                {formState === 'SIGNUP' ? 'Sign up' : 'Login'} to Binamite
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {formState === 'SIGNUP'
                  ? 'Already a member?'
                  : "Don't have an account?"}
                <span
                  style={{ color: '#574AE2', cursor: 'pointer' }}
                  onClick={() =>
                    setFormState(formState === 'SIGNUP' ? 'LOGIN' : 'SIGNUP')
                  }
                >
                  {formState === 'SIGNUP' ? ' Sign In' : ' Create'}
                </span>
              </Typography>
              <TextField
                name="email"
                fullWidth
                label="Email"
                variant="outlined"
                sx={{ marginBottom: '16px' }}
                error={formSubmit && error.hasOwnProperty('email')}
                helperText={
                  formSubmit && error.hasOwnProperty('email') && error.email
                }
                value={formValues.email}
                onChange={(e) => handleChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="password"
                type="text"
                fullWidth
                label="Passowrd"
                variant="outlined"
                error={formSubmit && error.hasOwnProperty('password')}
                helperText={
                  formSubmit && error.hasOwnProperty('password')
                    ? error.password
                    : '1 lower character, 1 upper character, 1 number, and 1 special character, also keep it minimum 8 characters long.'
                }
                value={formValues.password}
                onChange={(e) => handleChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
            <CardActions
              sx={{ justifyContent: 'center', marginBottom: '16px' }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  color: '##FFFFFF',
                  backgroundColor: '#1A1A1A',
                  textTransform: 'capitalize',
                  borderRadius: '16px',
                  width: '100%',
                }}
              >
                {formState === 'SIGNUP' ? 'Create an account' : 'Login'}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>

      {msg && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity={msg.severity}
            sx={{ width: '100%' }}
          >
            {msg.text}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default LandingPage;
