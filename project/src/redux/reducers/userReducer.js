import produce from 'immer';
import createReducer from './ReducerUtils'

const initialState = {
    user: {
        id: "",
        userName: "",
        // password: ""
    }

}
const Users = {
    setUserName(state, action) {
        state.userName = action.payload;
    },
    // setUserPassword(state, action) {
    //     state.password = action.payload;
    // },
    setUser(state, action) {
        state.user.id = action.payload.id;
        state.user.userName = action.payload.userName;
        // state.user.password = action.payload.password;
    }
}

export default produce((action, payload) => createReducer(action, payload, Users), initialState);
