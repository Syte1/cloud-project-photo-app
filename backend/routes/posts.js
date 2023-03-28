const express = require("express")
const router = express.Router()

const db = require('../dynamo')

router.get("/", async(req,res) =>{
  let posts = await db.getAllPost()
  res.send(posts)
})

router.post("/", async (req, res) =>{
  let body = req.body
  let like_count = parseInt(body.like_count)
  let new_post = {postID: body.postID, description: body.description, img_path: body.img_path, password: body.password, like_count: like_count}
  await db.addPost(new_post)

  res.status(200).send(new_post)

})

router.get("/:postID", async (req, res) =>{
  let postID = req.params.postID
  console.log(postID)
  let post = await db.getPostById(postID)
  res.send(post)
})

/**
 * Increment the like count when a put request to a specific post is received.
 */
router.put("/:postID", async(req, res) =>{
  let postID = req.params.postID
  await db.incrementLikeCount(postID)
  let post = await db.getPostById(postID)
  res.send(post)
})

/**
 * Delete the post with the password provided.
 */
router.delete("/:postID", async(req,res) =>{
  let postID = req.params.postID
  let password = req.body.password
  let result = await db.deletePost(postID, password)
  res.send(result)

})

module.exports = router