import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cname: " nav-text",
  },
  {
    title: "Doctors",
    path: "/Doctors",
    icon: <FaIcons.FaStethoscope />,
    cname: " nav-text",
  },
  {
    title: "Patients",
    path: "/patients",
    icon: <IoIcons.IoIosPerson />,
    cname: " nav-text",
  },
  {
    title: "Logout",
    path: "/Login",
    icon: <BiIcons.BiLogOut />,
    cname: "nav-text",
  },
];
