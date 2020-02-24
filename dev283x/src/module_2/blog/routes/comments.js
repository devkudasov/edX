const storage = require('../storage')

const __getComments = postId => storage.posts[postId - 1] ? storage.posts[postId - 1].comments : null
const __getComment = (postId, commentId) => {
    const comments = __getComments(postId)
    return comments ? comments[commentId - 1] : null
}

const addComment = (req, res) => {
    const comments = __getComments(req.params.postId)

    if (!comments) return res.status(400).send()

    const id = comments.length + 1
    __getComments(req.params.postId).push({
        id,
        text: req.body.text || ''
    })

    res.status(201).send({ ...__getComment(req.params.postId, id) })
}

const updateComment = (req, res) => {
    const comment = __getComment(req.params.postId, req.params.commentId)

    if (!comment) return res.status(400).send()

    comment.text = req.body.text ||

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