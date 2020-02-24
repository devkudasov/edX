const storage = require('../storage')

const addPost = (req, res) => {
    const id = storage.posts.length + 1
    storage.posts.push({
        id,
        ...req.body,
        comments: []
    })

    res.status(201).send(storage.posts[id - 1])
}

const updatePost = (req, res) => {
    storage.posts[req.params.postId - 1] = req.body

    res.status(200).send(storage.posts[req.params.postId - 1])
}

const deletePost = (req, res) => {
    storage.posts.splice(req.params.postId - 1, 1)

    res.status(204).send({ id: req.params.postId })
}

const getPosts = (req, res) => {
    res.status(200).send(storage.posts)
}

module.exports = {
    addPost,
    updatePost,
    deletePost,
    getPosts
}