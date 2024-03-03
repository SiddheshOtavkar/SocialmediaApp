import { api } from "../../config/api";
import {
    CREATE_CHAT_FAILURE,
    CREATE_CHAT_REQUEST,
    CREATE_CHAT_SUCCESS,
    CREATE_MESSAGE_FAILURE,
    CREATE_MESSAGE_REQUEST,
    CREATE_MESSAGE_SUCCESS,
    GET_ALL_CHATS_FAILURE,
    GET_ALL_CHATS_REQUEST,
    GET_ALL_CHATS_SUCCESS,
} from "./message.actionType";

export const createMessage = (message) => async (dispatch) => 
{
    dispatch({ type: CREATE_MESSAGE_REQUEST });
    try {
        const { data } = await api.post(`/api/messages/chat/${message.chatId}`, message);
        console.log("created message ", data);

        dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
    } 
    catch (error) {
        console.log("Catch Error ", error);
        dispatch({
            type: CREATE_MESSAGE_FAILURE,
            payload: error,
        });
    }
};

export const createChat = (chats) => async (dispatch) => 
{
    dispatch({ type: CREATE_CHAT_REQUEST });
    try {
        const { data } = await api.post(`/api/chats`, chats);
        console.log("Created Chats ", data);

        dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
    } 
    catch (error) {
        console.log("Catch Error ", error);

        dispatch({
            type: CREATE_CHAT_FAILURE,
            payload: error,
        });
    }
};

export const getAllChats = () => async (dispatch) => 
{
    dispatch({ type: GET_ALL_CHATS_REQUEST });
    try {
        const { data } = await api.get(`/api/chats/user`);
        console.log("Get All Chats: ", data);

        dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: data });
    } 
    catch (error) {
        console.log("Catch Error ", error);

        dispatch({
            type: GET_ALL_CHATS_FAILURE,
            payload: error,
        });
    }
};
