import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import addPost from './addPost';

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(function Posts(props) {
    const { user } = props;
    let [ListPosts, setListPosts] = useState([]);
    useEffect(
        () => {

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json()).then((resJson) => {
                    setListPosts(resJson)
                    console.log(ListPosts)
                })
                .catch((err) => {
                    console.log(err)
                })
        }, []
    )


    return (
        <>
            <h1 style={{ color: 'green' }}>Posts</h1>
            <div className="row" style={{ marginLeft: 2 }} style={{ color: 'green' }} >
                {ListPosts[0] && ListPosts.map((post) =>
                    <div key={post._id} className="card border-success mb-3 ml-2 mr-2" style={{ width: "18rem" }}>
                        <div className="card-header">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </div>
                        <div className="card-body text-success">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
                            <button
                                type="button"
                                onClick={() => { addPost(post, user.id) }}
                                className="btn btn-outline-success" >add to my posts
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
})