import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from "redux-form";
import addPost from '../addPost';
import { input } from '../../formValidator/inputControl';

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    }
}

function NewPost(props) {
    const titleRef = React.createRef()
    const bodyRef = React.createRef()
    const { handleSubmit, user } = props;

    function newPost() {
        const post = {
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        addPost(post, user.id)
    }

    return (
        <>
            <form className='col-6' style={{ color: "green", marginTop: 60, marginLeft: 350 }} onSubmit={handleSubmit(newPost)}  >
                <svg style={{ width: 200, height: 200 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
                <h2>add new post</h2>

                <div className="form-group">
                    <label>title</label>
                    <input
                        name="title"
                        type="text"
                        component={input}
                        id="title"
                        ref={titleRef}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>body</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"
                        ref={bodyRef}
                    ></textarea>
                </div>

                <div className="form-group">
                    <button
                        style={{ width: 300 }}
                        type="submit"
                        className="btn btn-success" >
                        add post
                </button>
                </div>
            </form>
        </>
    )
}

export default connect(mapStateToProps)(reduxForm({
    form: 'NewPost',
})(NewPost))