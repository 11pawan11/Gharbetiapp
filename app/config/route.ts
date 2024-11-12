// route.ts
import WelcomeScreen from "../screens/user/welcomeScreen";
import LoginScreen from "../login/loginPage";
import AvailableRooms from "../screens/user/availableRoom";
import Setting from "../screens/user/setting";
import MyRoom from "../screens/user/myRoom";
import PaymentSection from "@/app/screens/user/paymentSection";
import AboutUs from "../screens/user/aboutUs";
import Home from "../screens/admin/home";
import AddTotalRooms from "../screens/admin/addTotalRooms";
import AdminLoginScreen from "../screens/admin/login/adminloginPage";

// Lazy load your screens
// const WelcomeScreen = lazy(() => import("../screens/welcomeScreen"));
// const AvailableRooms = lazy(() => import("../screens/availableRoom"));
// const Setting = lazy(() => import("../screens/setting"));
// const Login = lazy(() => import("../login/loginPage"));

const coreRoutes = [
  //user routes
  {
    name: "Gharbeti Home",
    component: WelcomeScreen,
    icon: "home",
    role: "user",
  },
  {
    name: "My Room",
    component: MyRoom,
    icon: "users",
    role: "user",
  },

  {
    name: "Available Rooms",
    component: AvailableRooms,
    icon: "folder",
    role: "user",
  },
  {
    name: "About Us",
    component: AboutUs,
    icon: "info",
  },
  {
    name: "Settings",
    component: Setting,
    icon: "cog",
    role: "user",
  },
  {
    name: "Payment QR",
    component: PaymentSection,
    icon: "qrcode",
    role: "user",
  },

  //admin routes
  {
    name: "Home",
    component: Home,
    icon: "home",
    role: "admin",
  },
  {
    name: "Add Total Rooms",
    component: AddTotalRooms,
    icon: "addfile",
    role: "admin",
  },
];

export default coreRoutes;
