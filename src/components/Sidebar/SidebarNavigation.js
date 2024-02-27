import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FcPhotoReel } from "react-icons/fc";

export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/"
  },
  {
    title: "Reels",
    // icon: <LanguageIcon />,
    icon: <FcPhotoReel style={{ fontSize: 25 }}/>,
    path: "/reels"
  },
  {
    title:"Create Reels",
    icon:<ControlPointIcon />,
    path:"/create-reels"
  },
  {
    title:"Notifications",
    icon:<NotificationsIcon />,
    path:"/"
  },
  {
    title:"Message",
    icon:<MessageIcon />,
    path:"/message"
  },
  {
    title:"List",
    icon:<ListAltIcon />,
    path:"/"
  },
  {
    title:"Communities",
    icon:<GroupIcon />,
    path:"/"
  },
  {
    title:"Profile",
    icon:<AccountCircleIcon />,
    path:"/profile"
  },
]