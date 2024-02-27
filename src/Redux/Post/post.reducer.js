import * as actionType from "./post.actionType";

const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    like: null
}

const postReducer = (state = initialState, action) => {

    switch (action.type) 
    {
        case actionType.CREATE_POST_REQUEST:
        case actionType.GET_ALL_POST_REQUEST:
        case actionType.LIKE_POST_SUCCESS:
            return { ...state, error: null, loading: false };

        


        default:
            break;
    }

}