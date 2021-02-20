import { actionsUser } from "../actions/userAction";

export const login = ({ dispatch }) => next => action => {
    if (action.type === 'LOGIN') {
        debugger
        const u = action.payload
        const user = { userName: u.userName, password: u.password }

        fetch('http://localhost:3001/login/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)

        })
            .then((res) => res.json()).then((resJson) => {
                console.log(resJson)
                debugger
                if (resJson.userId != null) {
                    localStorage.setItem('token', resJson.token)
                    debugger
                    user.id = resJson.userId
                    console.log(user.id)
                    dispatch(actionsUser.setUser(user))

                    alert("welcoem to " + user.userName)
                }
                else {
                    alert("Incorrect username or password !!!!!!!!")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return next(action);
};