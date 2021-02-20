import { actionsUser } from "../actions/userAction";

export const addUser = ({ dispatch }) => next => action => {
    if (action.type === 'ADD_USER') {

        const u = action.payload
        const user = { userName: u.userName, password: u.password }

        fetch('http://localhost:3001/AddUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)

        })
            .then((res) => res.json()).then((resJson) => {
                console.log(resJson)
                debugger
                if (resJson.userId != null) {
                    localStorage.setItem('token', resJson.token)
                    debugger
                    user.id = resJson.userId;
                    dispatch(actionsUser.setUser(user))
                    alert("welcoem to " + user.userName)
                }
                else {
                    alert("Username and password already exist in system")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return next(action);
};