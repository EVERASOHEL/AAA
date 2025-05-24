import Home from '../containers/Dashboard';
import Product from '../containers/Product/index';
import companyMaster from '../containers/CompanyMaster/index';
import SalesOrder from '../containers/Sales/SalesOrder/index';
import PurchaseOrder from '../containers/purchase/PurchaseOrder/index';
import ExpenseCategory from '../containers/Expense/ExpenseCategory/index';
import ExpenseMaster from '../containers/Expense/ExpenseMaster/index';
// import PurchaseOrderwithGstAndNonGst from '../containers/purchase/PurchaseOderwithGstAndNoneGst/index';
import Payment from '../containers/Payment';
import HomeImg from '../components/images/sidebarimages/wired-lineal-63-home.gif'
import ProductImg from '../components/images/sidebarimages/wired-flat-943-commodity.gif'
import CompanyImg from '../components/images/sidebarimages/wired-flat-27-globe.gif'
import SalesImg from '../components/images/sidebarimages/wired-flat-153-bar-chart-growth.gif'
import CreateOrderImg from '../components/images/sidebarimages/icons8-create-order-48.png'
import ReceivePaymentImg from '../components/images/sidebarimages/icons8-receive-dollar-48.png'
import PurchaseImg from '../components/images/sidebarimages/wired-lineal-146-basket-trolley-shopping-card.gif'
import PurchaseOrderImg from '../components/images/sidebarimages/icons8-purchase-order-48.png'
import ReportImg from '../components/images/sidebarimages/report.png'
import salesReportImg from '../components/images/reportimages/statistics.png'
import purchaseReportImg from '../components/images/reportimages/buy.png'
import AccountImg from '../components/images/sidebarimages/icons8-accountant-64.png'
import generalImg from '../components/images/sidebarimages/book.png'
import expenseImg from '../components/images/expenseimages/expense.png'
import expenseCategoryImg from '../components/images/expenseimages/expense_category.gif'
import './style.scss'

const routes = [
  {
    path: '/',
    title: 'Home',
    exact: true,
    component: Home,
    icon: <img src={HomeImg} className={'img'} alt="" srcset="" />
  },
  {
    path: '/companyMaster',
    exact: true,
    title: 'Company Master',
    component: companyMaster,
    icon: <img src={CompanyImg} className={'img'} alt="" srcset="" />
    // icon: <SavingsRoundedIcon/>,
  },
  {
    path: '/product',
    exact: true,
    title: 'Product Master',
    component: Product,
    icon: <img src={ProductImg} className={'img'} alt="" srcset="" />
    // icon: <BubbleChartRoundedIcon/>,
  },
  {
    path: '/sales',
    title: 'Sales',
    icon: <img src={SalesImg} className={'img'} alt="" srcset="" />,
    // icon: <ReceiptRoundedIcon/>,
    subMenu: [
      {
        path: '/sales/salesorder',
        component: SalesOrder,
        exact: true,
        title: 'Sales Order',
        icon: <img src={CreateOrderImg} className={'img'} alt="" srcset="" />,
        // icon: <SavingsRoundedIcon/>,
      },
      {
        path: '/sales/paymentreceived',
        component: SalesOrder,
        exact: true,
        title: 'Payments Received',
        icon: <img src={ReceivePaymentImg} className={'img'} alt="" srcset="" />,
      },
    ],
  },
  {
    path: '/purchase',
    title: 'Purchase',
    icon: <img src={PurchaseImg} className={'img'} alt="" srcset="" />,
    // icon: <ReceiptRoundedIcon/>,
    subMenu: [
      {
        path: '/purchase/purchaseorder',
        component: PurchaseOrder,
        exact: true,
        title: 'Purchase Order',
        icon: <img src={PurchaseOrderImg} className={'img'} alt="" srcset="" />,
        // icon: <SavingsRoundedIcon/>,
      },
      // {
      //   path: '/purchase/PurchaseOrderwithGstAndNonGst',
      //   component: PurchaseOrderwithGstAndNonGst,
      //   exact: true,
      //   title: 'Purchase Order',
      //   icon: <img src={PurchaseOrderImg} className={'img'} alt="" srcset="" />,
      //   // icon: <SavingsRoundedIcon/>,
      // },
      {
        path: '/purchase/payment',
        component: Payment,
        exact: true,
        title: 'Payments Mode',
        icon: <img src={ReceivePaymentImg} className={'img'} alt="" srcset="" />,
      },
    ],
  },
  {
    path: '/expense',
    title: 'Expense',
    icon: <img src={expenseImg} className={'img'} alt="" srcset="" />,
    // icon: <ReceiptRoundedIcon/>,
    subMenu: [
      {
        path: '/expense/newExpense',
        component: ExpenseMaster,
        exact: true,
        title: 'Expense',
        icon: <img src={expenseImg} className={'img'} alt="" srcset="" />,
        // icon: <SavingsRoundedIcon/>,
      },
      // {
      //   path: '/expense/expenseCategory',
      //   component: ExpenseCategory,
      //   exact: true,
      //   title: 'Expense Category',
      //   icon: <img src={expenseCategoryImg} className={'img'} alt="" srcset="" />,
      // },
    ],
  },
  {
    path: '/report',
    title: 'Report',
    icon: <img src={ReportImg} className={'img'} alt="" srcset="" />,
    // icon: <ReceiptRoundedIcon/>,
    subMenu: [
      {
        path: '/report/salesReport',
        component: PurchaseOrder,
        exact: true,
        title: 'Sales Report',
        icon: <img src={salesReportImg} className={'img'} alt="" srcset="" />,
        // icon: <SavingsRoundedIcon/>,
      },
      {
        path: '/report/purchaseReport',
        component: PurchaseOrder,
        exact: true,
        title: 'Purchase Report',
        icon: <img src={purchaseReportImg} className={'img'} alt="" srcset="" />,
      },
    ],
  },
  {
    path: '/account',
    title: 'Account',
    icon: <img src={AccountImg} className={'img'} alt="" srcset="" />,
    // icon: <ReceiptRoundedIcon/>,
    subMenu: [
      {
        path: '/account/manualjuonerals',
        component: PurchaseOrder,
        exact: true,
        title: 'Manual Journals',
        icon: <img src={generalImg} className={'img'} alt="" srcset="" />,
        // icon: <SavingsRoundedIcon/>,
      },
      
    ],
  },
];

export default routes;
