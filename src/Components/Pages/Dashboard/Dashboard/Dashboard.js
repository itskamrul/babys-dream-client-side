import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import MyBooking from '../MyBooking/MyBooking';
import logo from '../../../../images/logo.png';
import './Dashboard.css';
import BookingDash from '../BookingDash/BookingDash';
import GetReview from '../GetReview/GetReview';
import Pay from '../Pay/Pay';
import { Button } from '@mui/material';
import ManageProducts from '../ManageProducts/ManageProducts';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import useFirebase from '../../../../hooks/useFirebase';
import AdminRoute from '../../../../AdminRoute/AdminRoute';

const drawerWidth = 200;

function Dashboard(props) {
  const { logOut, admin } = useFirebase();
  console.log(admin);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <img className="img-fluid logo w-100" src={logo} alt="" />
      </Toolbar>
      <Divider />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {!admin && (
          <Box>
            <li>
              <Link to={`${url}/myBooking`}>My Booking</Link>
            </li>
            <li>
              <Link to={`${url}/pay`}>Pay</Link>
            </li>
            <li>
              <Link to={`${url}/getReview`}>Give A Review</Link>
            </li>
          </Box>
        )}
        {admin && (
          <Box>
            <li>
              <Link to={`${url}/allBooking`}>Manage All Booking</Link>
            </li>
            <li>
              <Link to={`${url}/manageProducts`}>Manage Products</Link>
            </li>
            <li>
              <Link to={`${url}/addProduct`}>Add Product</Link>
            </li>
            <li>
              <Link to={`${url}/makeAdmin`}>Make Admin</Link>
            </li>
          </Box>
        )}
      </ul>
      <Button
        sx={{ width: 1 }}
        onClick={logOut}
        variant="contained"
        className="login-btn"
      >
        LogOut
      </Button>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (admin === undefined) {
    return <h4>Loading...</h4>;
  } else {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: '#CF102D',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Switch>
            {!admin && (
              <Route exact path={path}>
                <MyBooking></MyBooking>
              </Route>
            )}
            {admin && (
              <AdminRoute exact path={path}>
                <BookingDash></BookingDash>
              </AdminRoute>
            )}
            <Route path={`${path}/myBooking`}>
              <MyBooking />
            </Route>
            <Route path={`${path}/pay`}>
              <Pay />
            </Route>
            <AdminRoute path={`${path}/addProduct`}>
              <AddProduct />
            </AdminRoute>
            <AdminRoute path={`${path}/allBooking`}>
              <BookingDash />
            </AdminRoute>
            <Route path={`${path}/getReview`}>
              <GetReview />
            </Route>
            <AdminRoute path={`${path}/manageProducts`}>
              <ManageProducts />
            </AdminRoute>
            <AdminRoute path={`${path}/makeAdmin`}>
              <MakeAdmin />
            </AdminRoute>
          </Switch>
        </Box>
      </Box>
    );
  }
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
