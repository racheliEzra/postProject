import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from "redux-form";
import { input } from '../formValidator/inputControl';
import { formValidatorHelper } from '../formValidator/formValidator'
import { actionsUser } from '../../redux/actions/userAction'
import { useHistory } from 'react-router-dom';
function mapStateToProps(state) {
    return {
        userRedux: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(actionsUser.login(user))
})

function Login(props) {
    const userNameRef = React.createRef()
    const passwordRef = React.createRef()
    const { login, userRedux } = props

    const history = useHistory()

    function SignIn() {

        const user = {
            userName: userNameRef.current.value,
            password: passwordRef.current.value
        }
        login(user)
    }

    function nav() {
        if (userRedux.id != '')
        // if (!(userRedux.userName == '' && userRedux.password == ''))
        {
            history.push('/nav')
        }
    }

    function goToRegister() {
        history.push('/registerUser')
    }

    const { handleSubmit, reset, pristine, submitting, valid } = props;

    return (
        <>

            <form className='col-3' style={{ color: "green", marginTop: 100, marginLeft: 550 }} onSubmit={handleSubmit(SignIn)}  >
                <svg style={{ width: 200, height: 200 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>

                <h2>Login form</h2>
                <div className="form-group">
                    <Field
                        name="userName"
                        class="form-control"
                        type="text"
                        component={input}
                        id="user-name"
                        placeholder="input user name"
                        ref={userNameRef}
                    />
                </div>

                <div className="form-group">
                    <Field
                        name="password"
                        class="form-control"
                        type="password"
                        component={input}
                        id="password"
                        placeholder="input password"
                        ref={passwordRef}
                    />
                </div>

                <div className="form-group">
                    <button
                        style={{ width: 150 }}
                        type="submit"
                        className="btn btn-success"
                        disabled={!valid || pristine || submitting}
                    >
                        login
                </button>
                    <button type="button" className="btn btn-success" style={{ width: 150, marginLeft: 15 }} onClick={reset}>
                        reset
                </button>
                </div>
                <button
                    style={{ width: 320 }}
                    type="button"
                    className="btn btn-success"
                    onClick={() => goToRegister()}>new user
                </button>
            </form>
            {nav()}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'Login',
    validate: formValidatorHelper
})(Login))