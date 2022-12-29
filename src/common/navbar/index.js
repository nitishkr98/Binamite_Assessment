import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const pages = ['Pricing', `Who it’s for `, 'Features ', 'Blog'];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F5DF4D',
  ...theme.typography.body2,
  padding: '10px 20px',
  borderRadius: '16px',
  textAlign: 'center',
  color: '#1A1A1A',
  cursor: 'pointer',
}));

const Navbar = ({ setFormState }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#1A1A1A', boxShadow: 'none' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontStyle: 'normal',
              fontWeight: 700,
              color: '#F5DF4D',
              textDecoration: 'none',
            }}
          >
            Binamite
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                color: '#F5DF4D',
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontStyle: 'normal',
              fontWeight: 700,
              color: '#F5DF4D',
              textDecoration: 'none',
            }}
          >
            Binamite
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  color: '#F5DF4D',
                  fontSize: '16px',
                  display: 'block',
                  textTransform: 'capitalize',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={2}>
              <Item onClick={() => setFormState('SIGNUP')}>Sign Up Free</Item>
              <Item onClick={() => setFormState('LOGIN')}>
                Login <ArrowForwardIcon fontSize="18" />
              </Item>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
