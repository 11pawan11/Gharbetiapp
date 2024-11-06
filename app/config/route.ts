// route.ts
import WelcomeScreen from "../screens/user/welcomeScreen";
import LoginScreen from "../login/loginPage";
import AvailableRooms from "../screens/user/availableRoom";
import Setting from "../screens/user/setting";
import MyRoom from "../screens/user/myRoom";
import PaymentSection from "@/app/screens/user/paymentSection";
import AboutUs from "../screens/user/aboutUs";
import Home from "../screens/admin/home";

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
  },
  {
    name: "My Room",
    component: MyRoom,
    icon: "users",
  },

  {
    name: "Available Rooms",
    component: AvailableRooms,
    icon: "folder",
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
  },
  {
    name: "Payment QR",
    component: PaymentSection,
    icon: "qrcode",
  },
  {
    name: "Login",
    component: LoginScreen,
    icon: "login",
  },
  //admin routes
  {
    name: "Home",
    component: Home,
    icon: "home",
  },
];

export default coreRoutes;
