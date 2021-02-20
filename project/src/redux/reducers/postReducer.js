import produce from 'immer';
import createReducer from './ReducerUtils'

const initialState = {
    post: {
        id: "",
        title: "",
        body: ""
    }
}

const Posts = {
    setTitle(state, action) {
        state.post.title = action.payload.title;
    },
    setBody(state, action) {
        state.post.body = action.payload.body;
    },
    setPost(state, action) {
        debugger
        state.post.id = action.payload._id;
        state.post.title = action.payload.title;
        state.post.body = action.payload.body;
    }
}

export default produce((action, payload) => createReducer(action, payload, Posts), initialState);
