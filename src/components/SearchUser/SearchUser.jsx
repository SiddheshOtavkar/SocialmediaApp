// import React from "react";
// import { Card, CardHeader } from '@mui/material';
// import { Avatar } from '@mui/material';

// const SearchUser = () => {

//   const handleSearchUser = () => {
//     console.log("search user...");
//   }

//   const handleClick = (id) => {
//     console.log(id);
//   }

//   return (
//     <div>
//       <div className="py-5 relative">
//         <input
//           type="text"
//           placeholder="search user..."
//           onChange={handleSearchUser}
//           className="bg-transparent border border-[#3b4054] outline-none w-full px5 py-3 rounded-full"
//         />
//       </div>

//       {
//         false && <Card>

//           <CardHeader onClick={() => {
//             handleClick()
//           }}
//             avatar={<Avatar src="https://images.pexels.com/photos/10066112/pexels-photo-10066112.jpeg?auto=compress&cs=tinysrgb&w=600 " />}
//             title="Code With Siddhesh"
//             subheader={"codewithsiddhesh"}
//           />

//         </Card>
//       }
//     </div>
//   );
// };

// export default SearchUser;

import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import { useDispatch } from 'react-redux';
import { searchUser } from './../../Redux/Auth/auth.action';
import { useSelector } from 'react-redux';
import { store } from './../../Redux/store';
import { createChat } from "../../Redux/Message/message.action";

const SearchUser = () => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const { message, auth } = useSelector(store => store);

    const handleSearchUser = (e) => {
        setUsername(e.target.value);
        console.log("search user...");
        dispatch(searchUser(username));
    };

    const handleClick = (id) => {
        dispatch(createChat({ userId: id }));
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="py-5 relative">
                <input
                    type="text"
                    placeholder="Search user..."
                    onChange={handleSearchUser}
                    className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />

                {username && (
                    auth.searchUser.map((item) => <Card key={item.id} className="max-w-md w-full rounded-lg shadow-md absolute z-10 top-[4.5rem] cursor-pointer">
                        <CardHeader
                            onClick={() => {
                                handleClick(item.id);
                                setUsername("")
                            }}
                            className="cursor-pointer"
                            avatar={
                                <Avatar src="https://images.pexels.com/photos/10066112/pexels-photo-10066112.jpeg?auto=compress&cs=tinysrgb&w=600" />
                            }
                            title={
                                <span className="text-lg font-semibold">{item.firstName + " " + item.lastName}</span>
                            }
                            subheader={<span className="text-gray-600">{item.firstName.toLowerCase() + item.lastName.toLowerCase()}</span>}
                        />
                    </Card>)
                )}
            </div>
        </div>
    );
};

export default SearchUser;
