import firebase from '@firebase/app'
import '@firebase/database'
import {
    CAPTIONPOST_CHANGE,
    INIT_EDIT_POST,
    EDIT_POST_CANCEL,
    SAVE_POST,
    EDIT_POST_FAIL,
    EDIT_POST_SUCCESS
} from './types'

export const initEditPost = (obj) => {
    console.log(obj)
    return {
        type: INIT_EDIT_POST,
        payload: {
            idPost: obj.idPost,
            captionPost: obj.captionPost,
            imagePost: obj.imagePost
        }
    }
}

export const selectEditPostCancel = () => {
    return {
        type: EDIT_POST_CANCEL
    }
}

export const inputCaptionPostChange = (caption) => {
    return {
        type: CAPTIONPOST_CHANGE,
        payload: caption
    }
}

export const savePost = (objPostBaru, idPost) => {
    console.log('masuk')
    return (dispatch) => {
        dispatch({ type: SAVE_POST })

        firebase.database().ref(`/posts/${idPost}`)
        .set(objPostBaru)
        .then(() => {
            dispatch({
                type: EDIT_POST_SUCCESS
            })
        })
        .catch(()=> {
            dispatch({
                type: EDIT_POST_FAIL,
                payload: err.message
            })
        })
    }
}
