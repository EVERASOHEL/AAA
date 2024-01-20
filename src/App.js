import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  Link,
} from "react-router-dom";
import routes from "./routes/router";
import compnayMaster from "./containers/CompanyMaster/index";
import SidebarLayout from "./components/AppBar/index";
import { useProSidebar } from "react-pro-sidebar";
import "./components/AppBar/styles.scss";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import 'react-pro-sidebar/dist/css/sidebar.min.css';
// import "react-pro-sidebar/dist/css/styles.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box, Avatar } from "@mui/material";
import profileimage from "./components/images/beautiful_accounting_profile.webp";
import logo from "./components/images/alphalogo.gif";
import setting from "./components/images/icons8-settings-48.png";
import Payment from "./containers/Payment";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: blue[500],
//     },
//   },
// });

// const useStyles = makeStyles((theme) => ({
//   header: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100px',
//     background: theme.palette.primary.main,
//     color: '#fff',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   companyName: {
//     fontSize: '36px',
//     fontWeight: 'bold',
//     animation: '$slideAnimation 10s linear infinite',
//   },
//   '@keyframes slideAnimation': {
//     '0%': {
//       transform: 'translateX(100%)',
//     },
//     '100%': {
//       transform: 'translateX(-100%)',
//     },
//   },
// }));

const App = (props) => {
  // const { collapseSidebar, toggleSidebar, toggled, broken, rtl } =
  //   useProSidebar();

  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100, // Adjust this value to control when the animation triggers
  });

  return (
    <Router>
      <ToastContainer position="top-center" />
      <div style={{ display: "flex", display: "block" }}>
        <div className="app-container companyname"
          // style={{ width: collapsed ? "80px" : "350px" }}
        >
          <Sidebar
            className="app"
            collapsed={collapsed}
            style={{ display: "flex", height: "100vh" }}
          >
            <Menu iconShape="square">
              <MenuItem
                // className={classes.header}
                className="menu1"
                icon={
                  <MenuRoundedIcon
                    onClick={() => {
                      handleToggleSidebar();
                    }}
                  />
                }
              >
                {/* <Typography variant="h2" className={classes.companyName}>
                Alpha
                </Typography> */}
                <h2 className="companyname cursive-text">Vexon</h2>
              </MenuItem>
              {routes.map((route, index) =>
                route.subMenu ? (
                  <SubMenu
                    key={index}
                    className="sidebarlink"
                    label={route.title}
                    icon={route.icon}
                  >
                    {route.subMenu.map((subItem, subIndex) => (
                      <MenuItem key={subIndex} icon={subItem.icon}>
                        <Link
                          className="sidebarlink"
                          to={subItem.path}
                          // style={{ textDecoration: "none", color: "inherit",fontSize:"15px"  }}
                        >
                          {subItem.title}
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem key={index} icon={route.icon}>
                    <Link
                      to={route.path}
                      className="sidebarlink"
                      // style={{ textDecoration: "none", color: "inherit",fontSize:"15px" }}
                    >
                      {route.title}
                    </Link>
                  </MenuItem>
                )
              )}
              {/* {routes.map((route) => (
              <MenuItem key={route.path} icon={route.icon}>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={route.path}>{route.title}</Link>
              </MenuItem>
            ))} */}
              {/* <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem> */}
            </Menu>
          </Sidebar>
          {/* <SidebarLayout/> */}
          <div className="content">
            <AppBar position="static" sx={{ backgroundColor: "#efefef" }}>
              <Toolbar>
                <img src={logo} style={{ width: "40px" }} alt="" srcset="" />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <p
                    variant="h6"
                    className="cursive-text"
                    component="div"
                    style={{ fontSize: "large", color: "darkgray",marginBottom:"0px" }}
                  >
                    WEL-CON CONTROL & SWITCHGEAR
                  </p>
                </Typography>
                <img
                  src={setting}
                  style={{ width: "40px", marginRight: "20px" }}
                  alt=""
                  srcset=""
                />
                <Box>
                  <Avatar alt="Remy Sharp" src={profileimage} />
                </Box>

                {/* Add navigation links or other components here */}
              </Toolbar>
            </AppBar>
            <Routes>
              {routes.map((route, index) =>
                route.subMenu ? (
                  route.subMenu.map((subPath) => (
                    <Route
                      key={index}
                      path={subPath.path}
                      exact
                      Component={subPath.component}
                    />
                  ))
                ) : (
                  <Route
                    path={route.path}
                    key={index}
                    exact
                    Component={route.component}
                  />
                )
              )}
              <Route
                path={"/purchase/purchaseorder/Payment"}
                key={222}
                exact={true}
                Component={Payment}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
