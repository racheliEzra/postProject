import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { actionsPost } from '../../redux/actions/postAction';
import { useHistory } from 'react-router-dom'

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        post: state.postReducer.post
    }
}

const mapDispatchToProps = (dispatch) => ({
    setPost: (post) => dispatch(actionsPost.setPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(function MyPosts(props) {

    const [myPosts, setMyPosts] = useState([]);
    const { user, setPost } = props;
    const history = useHistory()
    function getMyPosts() {
        fetch('http://localhost:3001/getUserPosts/' + user.id, {
            method: 'get',
            headers: {
                // Authorization: TokenToString,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        })
            .then((res) => res.json()).then((resJson) => {
                setMyPosts(resJson.posts)
                console.log(myPosts[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getMyPosts()

    }, [])

    function deletePost(postId) {
        fetch('http://localhost:3001/deletePost/' + user.id + "/" + postId + "/", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        })

            .then((res) => res.json()).then((resJson) => {
                if (resJson == true) {
                    alert("post deleted")
                    getMyPosts()
                }
                else {
                    alert("post not deleted")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function updatePost(post) {
        setPost(post)
        history.push('/updatePost')
    }
    function addPost() {
        history.push('/newPost')
    }
    return (
        <>
            <button style={{ marginLeft: 2 }} type="button" onClick={() => addPost()} className="btn btn-outline-success" style={{ width: 200 }}>add new post</button>

            <div className="row" style={{ marginLeft: 2, marginTop: 30 }} >
                {
                    myPosts[0] && myPosts.map((post) =>

                        <div key={post._id} className="card border-success mb-3 ml-2 mr-2" style={{ maxWidth: '18rem', color: "green" }}>
                            <div className="card-header"><svg style={{ marginLeft: 0 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
                            </svg><b>:</b>{post.date} <svg style={{ marginRight: 0 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                                </svg>:{post.time}</div>
                            <div className="card-body text-success">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <button type="button" onClick={() => deletePost(post._id)} className="btn btn-outline-success" style={{ marginRight: 20 }}>delete</button>
                                <button type="button" onClick={() => updatePost(post)} className="btn btn-outline-success">update</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
})

