// import React from 'react';
// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
// import { Link, Route, useLocation } from 'react-router-dom';

// const SidebarLayout = ({ routes }) => {
//   // const location = useLocation();

//   return (
//     <div className="sidebar-layout">
//       <ProSidebar>
//         <Menu iconShape="square">
//           {routes.map((route) => {
//             if (route.subRoutes) {
//               return (
//                 <SubMenu key={route.path} title={route.title}>
//                   {route.subRoutes.map((subRoute) => (
//                     <MenuItem key={subRoute.path}>
//                       <Link to={subRoute.path}>{subRoute.title}</Link>
//                     </MenuItem>
//                   ))}
//                 </SubMenu>
//               );
//             }

//             return (
//               <MenuItem key={route.path}>
//                 <Link to={route.path}>{route.title}</Link>
//               </MenuItem>
//             );
//           })}
//         </Menu>
//       </ProSidebar>
//       <div className="content">
//         {/* Render content based on the current route */}
//         {routes.flatMap((route) => route.subRoutes || route).map((route) => (
//           <Route key={route.path} path={route.path} exact>
//             {route.component}
//           </Route>
//         ))}
//       </div>
//     </div>
//   );
// };



// export default SidebarLayout;



