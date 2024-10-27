// route.ts
import { lazy } from "react";

// Lazy load your screens
const WelcomeScreen = lazy(() => import("../screens/welcomeScreen"));
const Setting = lazy(() => import("../screens/setting"));
const Login = lazy(() => import("../login/loginPage"));

// Define a type for valid Entypo icon names
type EntypoIconName =
  | "home"
  | "folder"
  | "info"
  | "cog"
  | "user"
  | "login"
  | "log-out"
  | "trash"
  | undefined; // allow undefined if you want to optionally include an icon

const coreRoutes = [
  {
    name: "Gharbeti Home",
    component: WelcomeScreen,
    icon: "home" as EntypoIconName,
  },
  {
    name: "Login",
    component: Login,
    icon: "folder" as EntypoIconName,
  },
  {
    name: "Available Rooms",
    component: Setting,
    icon: "folder" as EntypoIconName,
  },
  {
    name: "About Us",
    component: Setting,
    icon: "info" as EntypoIconName,
  },
  {
    name: "Settings",
    component: Setting,
    icon: "cog" as EntypoIconName,
  },
];

export default coreRoutes;
