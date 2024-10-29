// route.ts
import WelcomeScreen from "../screens/welcomeScreen";
import LoginScreen from "../login/loginPage";
import AvailableRooms from "../screens/availableRoom";
import Setting from "../screens/setting";
import MyRoom from "../screens/myRoom";
import PaymentSection from "@/paymentSection";
import AboutUs from "../screens/aboutUs";

// Lazy load your screens
// const WelcomeScreen = lazy(() => import("../screens/welcomeScreen"));
// const AvailableRooms = lazy(() => import("../screens/availableRoom"));
// const Setting = lazy(() => import("../screens/setting"));
// const Login = lazy(() => import("../login/loginPage"));

// Define a type for valid Entypo icon names
// type EntypoIconName =
//   | "home"
//   | "folder"
//   | "info"
//   | "cog"
//   | "user"
//   | "login"
//   | "log-out"
//   | "trash"
//   | "users"
//   | undefined; // allow undefined if you want to optionally include an icon

// type AntDesignName = "qrcode" | undefined;

const coreRoutes = [
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
];

export default coreRoutes;
