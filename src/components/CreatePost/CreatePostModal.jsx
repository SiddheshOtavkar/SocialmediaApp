import { Avatar, Box, IconButton, Modal, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useDispatch } from 'react-redux';
import { createPostAction } from './../../Redux/Post/post.action';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: ".6rem",
    outline: "none",
};

const CreatePostModal = ({ handleClose, open }) => {

    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            caption: "",
            image: "",
            video: ""
        },
        onSubmit: (values) => {
            console.log("formik values ", values);
            dispatch(createPostAction(values));
        },
    });

    const handleSelectImage = async (event) => {
        setIsLoading(true);
        // console.log(event.target.files); FileList -> (0: File , 1:length)
        // console.log(event.target.files[0]); (File)
        const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
        setSelectedImage(imageUrl);
        setIsLoading(false);
        formik.setFieldValue("image", imageUrl); // Formik will keep track of the form field's value and manage its state accordingly, allowing you to handle form submissions and validations effectively.
    };

    const handleSelectVideo = async (event) => {
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
        setSelectedVideo(videoUrl);
        setIsLoading(false);
        formik.setFieldValue("video", videoUrl);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="flex space-x-4 items-center">
                            <Avatar />
                            <div>
                                <p className="font-bold text-lg">Code with Siddhesh</p>
                                <p className="text-sm">@codewithsiddhesh</p>
                            </div>
                        </div>

                        <textarea
                            className="w-full mt-5 p-2 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:border-[#3b4054]"
                            placeholder="write caption.."
                            name="caption"
                            id=""
                            rows="4"
                            value={formik.values.caption}
                            onChange={formik.handleChange}
                        ></textarea>

                        <div className="flex space-x-5 items-center mt-5">
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleSelectImage}
                                    style={{ display: "none" }}
                                    id="image-input"
                                />
                                <label htmlFor="image-input">
                                    <IconButton color="primary" component="span">
                                        <ImageIcon />
                                    </IconButton>
                                </label>
                                <span>Image</span>
                            </div>

                            <div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleSelectVideo}
                                    style={{ display: "none" }}
                                    id="video-input"
                                />
                                <label htmlFor="video-input">
                                    <IconButton color="primary" component="span">
                                        <VideocamIcon />
                                    </IconButton>
                                </label>
                                <span>Video</span>
                            </div>
                        </div>

                        {selectedImage && <div>
                            <img className="h-[10rem]" src={selectedImage} alt="" />
                        </div>}

                        <div className="flex w-full justify-end">
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    borderRadius: "1.5rem",
                                    backgroundColor: "#1976D2", // Blue color
                                    color: "white", // White text color
                                    boxShadow: "none", // Remove box shadow
                                    "&:hover": {
                                        backgroundColor: "#1565C0", // Darker blue color on hover
                                    }
                                }}
                            >
                                Post
                            </Button>
                        </div>

                    </div>
                </form>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Modal>
    );
};

export default CreatePostModal;
