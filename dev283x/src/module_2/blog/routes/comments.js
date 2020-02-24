const storage = require('../storage')

const __getComments = postId => storage.posts[postId - 1].comments
const __getComment = (postId, commentId) => __getComments(postId)[commentId - 1]

const addComment = (req, res) => {
    const id = __getComments(req.params.postId).length + 1
    storage.posts[req.params.postId].comments.push({
        id,
        text: res.body
    })

    res.status(201).send({...__getComments(req.params.postId)[id - 1]})
}

const updateComment = (req, res) => {
    const comment = __getComment(req.params.postId, req.params.commentId)
    comment.text = req.body

    res.status(204).send(comment)
}

const deleteComment = (req, res) => {
    storage.splice(req.params.postId - 1, 1)

    res.status(200).send()
}

const getComments = (req, res) => {
    res.status(200).send(__getComments(req.params.postId))
}

module.exports = {
    addComment,
    updateComment,
    deleteComment,
    getComments
}