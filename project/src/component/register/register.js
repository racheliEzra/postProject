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
    AddUser: (user) => dispatch(actionsUser.addUser(user))
})

function Register(props) {
    const userNameRef = React.createRef()
    const passwordRef = React.createRef()
    const { AddUser } = props
    const history = useHistory();

    function SignIn() {
        const user = {
            userName: userNameRef.current.value,
            password: passwordRef.current.value
        }
        AddUser(user)
    }

    function nav() {
        if (userRedux.id != '')
        // if (!(userRedux.userName == '' && userRedux.password == ''))
        {
            history.push('/nav')
        }
    }

    const { handleSubmit, reset, pristine, submitting, valid, userRedux } = props;

    return (
        <>
            <form className='col-3' style={{ color: "green", marginTop: 100, marginLeft: 550 }} onSubmit={handleSubmit(SignIn)}  >
                <svg style={{ width: 200, height: 200 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                </svg>
                <h2>Register form</h2>
                <div className="form-group">
                    <label >userName</label>

                    <Field
                        name="userName"
                        type="text"
                        component={input}
                        id="user-name"
                        placeholder="input user name"
                        ref={userNameRef}
                    />
                </div>
                <div className="form-group">
                    <label >password</label>

                    <Field
                        name="password"
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
                        disabled={!valid || pristine || submitting} >
                        register
                </button>
                    <button type="button" className="btn btn-success" style={{ width: 150, marginLeft: 15 }} onClick={reset}>
                        reset
                </button>
                </div>
            </form>
            {nav()}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'Register',
    validate: formValidatorHelper
})(Register))
