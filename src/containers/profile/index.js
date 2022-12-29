import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Drawer,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DashboardIcon from '../../assets/img/dashboard.svg';
import SettingsIcon from '../../assets/img/settings.svg';
import InvoiceIcon from '../../assets/img/invoice.svg';
import PayoutIcon from '../../assets/img/payout.svg';
import ProfileIcon from '../../assets/img/profile.svg';
import LogoutIcon from '../../assets/img/logout.svg';
import EditIcon from '../../assets/img/edit.svg';
import UserIcon from '../../assets/img/user.svg';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateUserAction } from '../../redux/reducers/user';
import { useNavigate } from 'react-router-dom';

const initialState = {
  fullName: '',
  email: '',
  username: '',
  phone: '',
};

const UpdateBtn = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A1A1A',
  ...theme.typography.body2,
  padding: '10px 20px',
  borderRadius: '20px',
  textAlign: 'center',
  color: '#ffffff',
  cursor: 'pointer',
  fontWeight: 600,
}));

const CancelBtn = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F5F5F5',
  ...theme.typography.body2,
  padding: '10px 20px',
  borderRadius: '20px',
  textAlign: 'center',
  color: '#97999B',
  cursor: 'pointer',
  fontWeight: 600,
}));

const ExpertiseItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F5F5F5',
  ...theme.typography.body2,
  padding: '6px 10px',
  borderRadius: '8px',
  textAlign: 'center',
  color: '#1A1A1A',
  fontSize: '12px',
  fontWeight: 400,
  boxShadow: 'none',
}));

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const [formValues, setFormValues] = useState(initialState);
  const [formSubmit, setFormSubmit] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState({});

  const toggleDrawer = (event, open) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
    if (!open) setFormSubmit(false);
  };

  const handleChange = (e) => {
    let values = {
      [e.target.name]:
        e.target.name === 'username' || e.target.name === 'email'
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
        key === 'email' &&
        !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(
          data['email']
        )
      ) {
        err = {
          ...err,
          email: `Please enter a valid email address`,
        };
      } else if (key === 'phone' && !/^[6-9]\d{9}$/.test(data['phone'])) {
        err = {
          ...err,
          phone: `Please enter a valid phone no.`,
        };
      }
    }
    setError(err);
  };

  useEffect(() => {
    if (!user) navigate('/');
    else {
      setFormValues({ ...formValues, ...user });
    }
  }, []);

  useEffect(() => {
    checkValidation(formValues);
  }, [formSubmit, formValues]);

  const handleFormSubmit = (e) => {
    setFormSubmit(true);
    if (Object.keys(error).length) return;
    dispatch(updateUserAction(formValues));
    toggleDrawer(e, false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Grid container className="profile-wrapper">
      <Grid className="menu-list">
        <ul>
          <li>
            <div className="logo-text">
              <span>B</span>
            </div>
          </li>
          <li>
            <img src={DashboardIcon} alt="Dashboard icon" />
            <span className="menu-item">Dashboard</span>
          </li>
          <li>
            <img src={InvoiceIcon} alt="Invoices icon" />
            <span className="menu-item">Invoices</span>
          </li>
          <li>
            <img src={PayoutIcon} alt="Payout Methods icon" />
            <span className="menu-item">Payout Methods</span>
          </li>
          <li>
            <img src={ProfileIcon} alt="Profile icon" />
            <span className="menu-item">Profile</span>
          </li>
          <li>
            <img src={SettingsIcon} alt="Settings icon" />
            <span className="menu-item">Settings</span>
          </li>
          <li onClick={() => handleLogout()}>
            <img src={LogoutIcon} alt="Logout icon" />
            <span className="menu-item">Logout</span>
          </li>
        </ul>
      </Grid>
      <Grid className="profile-container">
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '36px',
            lineHeight: '42px',
            padding: '20px 30px',
          }}
        >
          Contrator Profile
        </Typography>
        <Grid container spacing={4} px={4}>
          <Grid item xs={6} mb={3}>
            <Box sx={{ minWidth: 275, marginBottom: '16px' }}>
              <Card variant="outlined">
                <CardContent>
                  <Grid display={'flex'} justifyContent="space-between">
                    <Typography
                      sx={{ fontSize: 24, fontWeight: 600 }}
                      gutterBottom
                    >
                      Profile
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: '#574AE2',
                        cursor: 'pointer',
                      }}
                      gutterBottom
                      onClick={(e) => toggleDrawer(e, true)}
                    >
                      <img src={EditIcon} alt="edit icon" /> Manage
                    </Typography>
                  </Grid>
                  <Grid display={'flex'}>
                    <Grid>
                      <img src={UserIcon} alt="User" />
                    </Grid>
                    <Grid ml={2}>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        Full Name
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        {user?.fullName ?? 'N/A'}
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        UserName
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        {user?.username ?? 'N/A'}
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        Email Address
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        {user?.email ?? 'N/A'}
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        +91 {user?.phone ?? '**********'}
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        Expertise
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <ExpertiseItem>graphic design</ExpertiseItem>
                        <ExpertiseItem>visual design</ExpertiseItem>
                        <ExpertiseItem>user research</ExpertiseItem>
                        <ExpertiseItem>prototyping</ExpertiseItem>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardContent>
                  <Grid display={'flex'} justifyContent="space-between">
                    <Typography
                      sx={{ fontSize: 24, fontWeight: 600 }}
                      gutterBottom
                    >
                      Address Location
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: '#574AE2',
                        cursor: 'pointer',
                      }}
                      gutterBottom
                    >
                      <img src={EditIcon} alt="edit icon" /> Manage
                    </Typography>
                  </Grid>
                  <Grid display={'flex'}>
                    <Grid>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        Time Zone
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        UTC+05:30 Mumbai, Kolkata, Chennai, New Delhi
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        Primary
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        A-83, Second Floor, Pocket D, Okhla Phase II, Okhla
                        Industrial Estate, New Delhi, Delhi 110020
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={6} mb={3}>
            <Box sx={{ minWidth: 275, marginBottom: '16px' }}>
              <Card variant="outlined">
                <CardContent>
                  <Grid display={'flex'} justifyContent="space-between">
                    <Typography
                      sx={{ fontSize: 24, fontWeight: 600 }}
                      gutterBottom
                    >
                      Tax Identification (ID)
                    </Typography>
                  </Grid>
                  <Grid display={'flex'}>
                    <Grid>
                      <Typography
                        variant="h6"
                        mb={1}
                        sx={{ fontSize: 12, fontWeight: 400, color: '#97999B' }}
                      >
                        A Primary Account Number (PAN) is requested from all
                        companies located in India.
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        Legal Taxpayer Name
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        Octaloop Technologies Private Limited
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        PAN Number
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        SFSFG8779B
                      </Typography>
                      <Typography
                        variant="h6"
                        mb={1}
                        sx={{ fontSize: 12, fontWeight: 400, color: '#D36480' }}
                      >
                        *PAN Pending Verification
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: 'capitalize',
                          backgroundColor: '#574AE2',
                          borderRadius: '12px',
                          fontWeight: 600,
                        }}
                      >
                        Verify Now
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ minWidth: 275, marginBottom: '16px' }}>
              <Card variant="outlined">
                <CardContent>
                  <Grid display={'flex'} justifyContent="space-between">
                    <Typography
                      sx={{ fontSize: 24, fontWeight: 600 }}
                      gutterBottom
                    >
                      GSTIN
                    </Typography>
                  </Grid>
                  <Grid display={'flex'}>
                    <Grid>
                      <Typography
                        variant="h6"
                        mb={1}
                        sx={{ fontSize: 12, fontWeight: 400, color: '#97999B' }}
                      >
                        A Good & Services Tax Identification Number is requested
                        from all persons located in country where Binamite
                        Supports GSTIN.
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        GSTIN
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        356DFHSFSFG8779B
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ minWidth: 275, marginBottom: '16px' }}>
              <Card variant="outlined">
                <CardContent>
                  <Grid display={'flex'} justifyContent="space-between">
                    <Typography
                      sx={{ fontSize: 24, fontWeight: 600 }}
                      gutterBottom
                    >
                      W-8BEN
                    </Typography>
                  </Grid>
                  <Grid display={'flex'}>
                    <Grid>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        Legal Taxpayer Name
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        Octaloop Technologies Private Limited
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ minWidth: 275, marginBottom: '16px' }}>
              <Card variant="outlined">
                <CardContent>
                  <Grid display={'flex'} justifyContent="space-between">
                    <Typography
                      sx={{ fontSize: 24, fontWeight: 600 }}
                      gutterBottom
                    >
                      W-9
                    </Typography>
                  </Grid>
                  <Grid display={'flex'}>
                    <Grid>
                      <Typography
                        variant="button"
                        sx={{ fontSize: 12, fontWeight: 600, color: '#97999B' }}
                      >
                        Legal Taxpayer Name
                      </Typography>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}
                        gutterBottom
                      >
                        Octaloop Technologies Private Limited
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Drawer anchor={'right'} open={drawerOpen}>
        <Grid px={3} py={2} width="380px">
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '28px',
              marginBottom: '8px',
            }}
          >
            Personal Details
          </Typography>
          <Typography
            variant="body"
            component="div"
            sx={{
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '16px',
              marginBottom: '24px',
              color: '#97999B',
            }}
          >
            Praesent sit amet velit lobortis, volutpat odio eget, tincidunt
            eros.
          </Typography>
          <TextField
            name="fullName"
            fullWidth
            label="Full Name"
            variant="outlined"
            sx={{ marginBottom: '24px' }}
            error={formSubmit && error.hasOwnProperty('fullName')}
            helperText={
              formSubmit && error.hasOwnProperty('fullName') && error.fullName
            }
            value={formValues.fullName}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="email"
            fullWidth
            label="Email ID"
            variant="outlined"
            sx={{ marginBottom: '24px' }}
            error={formSubmit && error.hasOwnProperty('email')}
            helperText={
              formSubmit && error.hasOwnProperty('email') && error.email
            }
            value={formValues.email}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="username"
            fullWidth
            label="Username"
            variant="outlined"
            sx={{ marginBottom: '24px' }}
            error={formSubmit && error.hasOwnProperty('username')}
            helperText={
              formSubmit && error.hasOwnProperty('username') && error.username
            }
            value={formValues.username}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="phone"
            fullWidth
            label="Phone no."
            variant="outlined"
            sx={{ marginBottom: '24px' }}
            error={formSubmit && error.hasOwnProperty('phone')}
            helperText={
              formSubmit && error.hasOwnProperty('phone') && error.phone
            }
            value={formValues.phone}
            onChange={(e) => handleChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={2}>
            <UpdateBtn onClick={(e) => handleFormSubmit(e)}>
              Update details
            </UpdateBtn>
            <CancelBtn onClick={(e) => toggleDrawer(e, false)}>
              Cancel
            </CancelBtn>
          </Stack>
        </Grid>
      </Drawer>
    </Grid>
  );
};

export default Profile;
