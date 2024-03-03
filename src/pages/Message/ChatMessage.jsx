import React from "react";
import { useSelector } from 'react-redux';

const ChatMessage = ({ item }) => {

    // const { auth } = useSelector((store) => store);
    const auth = useSelector((state) => state.auth);

    const isReqUserMessage = auth.user?.id === item.user?.id

    return (
        <div
            className={`flex ${isReqUserMessage ? "justify-start" : "justify-end"} text-white`}
        >
            <div
                className={`p-1 ${item.image ? "rounded-md" : "px-5 rounded-full"
                    } bg-[#191c29] `}
            >
                {item.image && (
                    <img
                        className="w-[12rem] h-[17rem] object-cover rounded-md"
                        alt=""
                        src="https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                )}
                <p className={`${true ? "py-2" : "py-1"}`}>{item.content}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
