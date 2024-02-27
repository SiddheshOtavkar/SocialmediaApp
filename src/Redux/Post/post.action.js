import { api } from "../../config/api"
import * as actionType from "./post.actionType"

export const createPostAction = (postData) => async (dispatch) => {

    dispatch({ type: actionType.CREATE_POST_REQUEST })
    try {
        const { data } = await api.post(`/api/post`, postData);
        dispatch({ type: actionType.CREATE_POST_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("Post error: ", error);
        dispatch({ type: actionType.CREATE_POST_FAILURE, payload: error });
    }
}

export const getAllPostAction = () => async (dispatch) => {

    dispatch({ type: actionType.GET_ALL_POST_REQUEST })
    try {
        const { data } = await api.get(`/api/posts`);
        dispatch({ type: actionType.GET_ALL_POST_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("Post error: ", error);
        dispatch({ type: actionType.GET_ALL_POST_FAILURE, payload: error });
    }
}

export const getUserPostAction = (userId) => async (dispatch) => {

    dispatch({ type: actionType.GET_USERS_POST_REQUEST })
    try {
        const { data } = await api.get(`/api/posts/user${userId}`);
        dispatch({ type: actionType.GET_USERS_POST_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("Post error: ", error);
        dispatch({ type: actionType.GET_USERS_POST_FAILURE, payload: error });
    }
}

export const likePostAction = (postId) => async (dispatch) => {

    dispatch({ type: actionType.LIKE_POST_REQUEST })
    try {
        const { data } = await api.put(`/api/posts/like${postId}`);
        dispatch({ type: actionType.LIKE_POST_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("Post error: ", error);
        dispatch({ type: actionType.LIKE_POST_FAILURE, payload: error });
    }
}