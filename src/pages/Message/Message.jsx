import React, { useEffect, useState } from "react";
import { Grid, Avatar, IconButton } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Message = () => {
	const dispatch = useDispatch();
	// const { message, auth } = useSelector((store) => store);
	const message = useSelector(state => state.message);
	const auth = useSelector(state => state.auth);

	const [currentChat, setCurrentChat] = useState();
	const [messages, setMessages] = useState([]);
	const [selectedImage, setSelectedImage] = useState();
	const [isLoading, setIsLoading] = useState(false);



	useEffect(() => {
		dispatch(getAllChats());
	}, []);

	useEffect(() => {
		setMessages([...messages, message.message])
	}, [message.message])

	console.log("chats ----", message.chats);
	// console.log("message ----", message.messages);

	const handleSelectImage = async (e) => {
		setIsLoading(true);
		console.log("handle select image....");
		const imgUrl = await uploadToCloudinary(e.target.files[0], "image")
		setSelectedImage(imgUrl);
		setIsLoading(false);
	};

	const handleCreateMessage = (value) => {
		const message = {
			chatId: currentChat?.id,
			content: value,
			image: selectedImage,
		};
		dispatch(createMessage(message));
	};

	return (
		<div>
			<Grid container className="h-screen overflow-y-hidden">
				<Grid className="px-5" item xs={3}>
					<div className="flex h-full justify-between space-x-2">
						<div className="w-full">
							<div className="flex space-x-4 items-center py-5">
								<WestIcon />
								<h1 className="text-xl font-bold">Home</h1>
							</div>

							<div className="h-[83vh]">
								<div className="">
									<SearchUser />
								</div>

								<div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
									{message.chats.map((item) => {
										return (
											<div
												key={item.id}
												onClick={() => {
													setCurrentChat(item);
													setMessages(item.messages);
												}}
											>
												<UserChatCard chat={item} />
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</Grid>
				<Grid className="h-full" item xs={9}>
					{currentChat ? (
						<div>
							<div className="flex justify-between items-center border-l p-5">
								<div className="flex items-center space-x-3">
									<Avatar src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600" />
									<p>{
										auth.user.id === currentChat.users[0].id
											? currentChat.users[1].firstName + " " + currentChat.users[1].lastName
											: currentChat.users[0].firstName + " " + currentChat.users[0].lastName
									}</p>
								</div>

								<div className="flex space-x-3">
									<IconButton>
										<AddIcCallIcon />
									</IconButton>

									<IconButton>
										<VideoCallIcon />
									</IconButton>
								</div>
							</div>

							<div className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
								{messages.map((item) => <ChatMessage item={item} key={item.id} />)}
							</div>

							<div className="sticky bottom-0 border-l">
								<div className="py-5 flex items-center justify-center space-x-5">
									<input
										onKeyDown={(e) => {
											if (e.key === "Enter" && e.target.value) {
												handleCreateMessage(e.target.value)
											}
										}}
										className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
										placeholder="Type message..."
										type="text"
									/>
									<div>
										<input
											type="file"
											accept="image/*"
											onChange={handleSelectImage}
											className="hidden"
											id="image-input"
										/>
										<label htmlFor="image-input">
											<AddPhotoAlternateIcon />
										</label>
									</div>
								</div>
							</div>
						</div>
					) : (

						<div className="h-full flex flex-col justify-center items-center">
							<ChatBubbleOutlineIcon sx={{ fontSize: "15rem", color: "#6B7280" }} />
							<p className="text-2xl font-semibold text-gray-700">No Chat Selected</p>
						</div>


					)}
				</Grid>
			</Grid>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={isLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

export default Message;
