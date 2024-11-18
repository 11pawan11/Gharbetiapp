import React, { lazy } from "react";

// Lazy load components
const WelcomeScreen = lazy(() => import("../screens/user/welcomeScreen"));
const AvailableRooms = lazy(() => import("../screens/user/availableRoom"));
const Setting = lazy(() => import("../screens/user/setting"));
const MyRoom = lazy(() => import("../screens/user/myRoom"));
const PaymentSection = lazy(() => import("../screens/user/paymentSection"));
const AboutUs = lazy(() => import("../screens/user/aboutUs"));
const Home = lazy(() => import("../screens/admin/home"));
const AddTotalRooms = lazy(() => import("../screens/admin/addTotalRooms"));
const AdminLoginScreen = lazy(
  () => import("../screens/admin/login/adminloginPage")
);

export const coreRoutes = [
  // user routes
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

  // admin routes
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

