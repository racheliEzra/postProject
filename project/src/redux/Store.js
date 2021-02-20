import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';

import { reducer as formReducer } from 'redux-form';
import { login } from './middlaware/crudLogin'
import { addUser } from './middlaware/crudAddUser'

const reducer = combineReducers({ userReducer, postReducer, form: formReducer })

const store = createStore(reducer, applyMiddleware(login, addUser))
window.store = store

export default store


