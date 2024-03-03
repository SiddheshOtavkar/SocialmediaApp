import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Divider from "@mui/material/Divider";
import { createCommentAction, likePostAction } from "../../Redux/Post/post.action";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { isLikedByReqUser } from "../../utils/isLikedByReqUser";

const PostCard = ({ item }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const dispatch = useDispatch();
    // const { post, auth } = useSelector(store => store);
    const post = useSelector(state => state.post);
    const auth = useSelector(state => state.auth);


    const handleShowComments = () => setShowComments(!showComments);

    const handleCreateComment = (content) => {
        const reqData = {
            postId: item.id,
            data: {
                content: content,
            },
        };
        dispatch(createCommentAction(reqData));
        setCommentContent("");
    };

    const handleLikePost = () => {
        dispatch(likePostAction(item.id));
    }

    return (
        <Card className="">
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.user.firstName.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.user.firstName + " " + item.user.lastName}
                subheader={
                    "@" +
                    item.user.firstName.toLowerCase() +
                    "_" +
                    item.user.lastName.toLowerCase()
                }
            />
            <CardMedia
                component="img"
                height="100"
                image={item.image}
                alt="Paella dish"
            />

            {/* <img className="w-full max:h-[30rem] object-cover object-top" src={item.image} alt="" /> */}

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {item.caption}
                </Typography>
            </CardContent>

            <CardActions className="flex justify-between" disableSpacing>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>

                    <IconButton>
                        <ShareIcon />
                    </IconButton>

                    <IconButton onClick={handleShowComments}>
                        <ChatBubbleIcon />
                    </IconButton>
                </div>

                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>
            </CardActions>

            {showComments && (
                <section>
                    <div className="flex items-center space-x-5 mx-3 my-5">
                        <Avatar sx={{}} />

                        <input
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleCreateComment(e.target.value);
                                    console.log("Invoked ----", e.target.value);
                                }
                            }}
                            className="w-full outline-none bg-gray-100 border border-gray-300 rounded-full px-5 py-2 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            type="text"
                            placeholder="Write your comment..."
                        />
                    </div>
                    <Divider />

                    {item.comments?.map((comment) =>
                        <div className="mx-3 space-y-5 my-5 text-sm" key={comment.id}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <Avatar
                                        style={{ backgroundColor: "#3B82F6" }}
                                        className="h-8 w-8 flex items-center justify-center text-white rounded-full"
                                    >
                                        <span className="text-xs font-bold">
                                            {item.user.firstName.charAt(0)}
                                        </span>
                                    </Avatar>
                                    <p className="text-gray-700">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </section>
            )}
        </Card>
    );
};

export default PostCard;
