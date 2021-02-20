
export default function addPost(post, userId) {
    const postToAdd = { title: post.title, body: post.body }
    console.log(post)

    fetch('http://localhost:3001/AddPost/' + userId, {

        method: 'post',
        headers: {
            'Authorization': localStorage.getItem('token'),
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postToAdd)
    })
        .then((res) => res.json()).then((resJson) => {
            alert("post added successfully")

        })
        .catch((err) => {
            console.log(err)
        })
}