import {
    INIT_EDIT_POST,
    CAPTIONPOST_CHANGE,
    EDIT_POST_CANCEL,
    SAVE_POST,
    EDIT_POST_FAIL,
    EDIT_POST_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    selectedEditPostId: null,
    postImage: '',
    captionPost: '',
    editLoading: false,
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_EDIT_POST:
            return {
                    ...INITIAL_STATE,
                    selectedEditPostId: action.payload.idPost,
                    postImage: action.payload.imagePost,
                    captionPost: action.payload.captionPost
                }
        case CAPTIONPOST_CHANGE:
            return {...state, captionPost: action.payload}
        case EDIT_POST_CANCEL:
            return {...INITIAL_STATE}
        case SAVE_POST: 
            return {...state, editloading: true, error: ''}
        case EDIT_POST_FAIL:
            return {...state, loading: false, error: action.payload}
        case EDIT_POST_SUCCESS:
            return INITIAL_STATE
        default :
            return state;
    }
};