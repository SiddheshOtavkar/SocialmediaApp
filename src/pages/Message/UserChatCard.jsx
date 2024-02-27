// import React from "react";
// import { Card, CardHeader, Avatar } from "@mui/material";
// import IconButton from '@mui/material/IconButton';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// const UserChatCard = () => {
//     return (
//         <Card>
//             <CardHeader
//                 avatar={
//                     <Avatar
//                         sx={{
//                             width: "3.5rem",
//                             height: "3.5rem",
//                             fontSize: "1.5rem",
//                             bgcolor: "#191c29",
//                             color: "rgb(88, 199,250)"
//                         }}
//                         src="https://images.pexels.com/photos/10066112/pexels-photo-10066112.jpeg?auto=compress&cs=tinysrgb&w=600"
//                     />
//                 }
//                 action={<IconButton>
//                     <MoreHorizIcon />
//                 </IconButton>}
//                 title="Code With SIddhesh"
//                 subheader="codewithsiddhesh"
//             ></CardHeader>
//         </Card>
//     );
// };

// export default UserChatCard;

import React from "react";
import { Card, CardHeader, Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const UserChatCard = ({ chat }) => {
  const { message, auth } = useSelector((store) => store);
  // console.log(auth.user.id); --> Login user ID

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", boxShadow: 3 }}>
      <CardHeader
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
        avatar={
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88, 199, 250)",
            }}
            src="https://images.pexels.com/photos/10066112/pexels-photo-10066112.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          auth.user.id === chat.users[0].id
            ? chat.users[1].firstName + " " + chat.users[1].lastName
            : chat.users[0].firstName + " " + chat.users[0].lastName
        }
        titleTypographyProps={{ fontSize: "1.2rem", fontWeight: 600 }}
        subheader={"new message"}
        subheaderTypographyProps={{ color: "#616161" }}
      />
    </Card>
  );
};

export default UserChatCard;
