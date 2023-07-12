import Home from '../containers/Sample';
import Product from '../containers/Product/index';
import ProductMaster from '../containers/ProductMaster/index';
import companyMaster from '../containers/CompanyMaster/index';
import Sample from '../containers/SampleFunctional/index'
import SalesOrder from '../containers/Sales/SalesOrder/index';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const routes = [
  {
    path: '/',
    title: 'Home',
    exact: true,
    component: Home,
    icon: <GridViewRoundedIcon/>
  },
  // {
  //   path: '/Product',
  //   title: 'Product',
  //   subRoutes: [
  //     {
  //       path: '/ProductMaster',
  //       exact: true,
  //       title: 'ProductMaster',
  //       component: ProductMaster,
  //     },
  //   //   {
  //   //     path: '/users/:id',
  //   //     title: 'User Profile',
  //   //     component: <UserProfile />,
  //   //   },
  //   ],
  // },
  {
    path: '/sample',
    exact: true,
    title: 'Sample',
    component: Sample,
    icon: <ReceiptRoundedIcon/>,
  },
  {
    path: '/companyMaster',
    exact: true,
    title: 'Company Master',
    component: companyMaster,
    icon: <SavingsRoundedIcon/>,
  },
  // {
  //   path: '/productMaster',
  //   exact: true,
  //   title: 'Product Master',
  //   component: ProductMaster,
  //   icon: <BubbleChartRoundedIcon/>,
  // },
  {
    path: '/product',
    exact: true,
    title: 'Product Master',
    component: Product,
    icon: <BubbleChartRoundedIcon/>,
  },
  {
    path: '/sales',
    title: 'Sales',
    icon: <ReceiptRoundedIcon/>,
    subMenu: [
      {
        path: '/sales/salesorder',
        component: SalesOrder,
        exact: true,
        title: 'Sales Order',
        icon: <SavingsRoundedIcon/>,
      },
    ],
  },
];

export default routes;
