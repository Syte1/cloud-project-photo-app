const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// AWS setting
AWS.config.update({region: process.env.AWS_DEFAULT_REGION,
accessKeyId:process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const POST_TABLE= "posts";
/**
 * Add a post to the posts table.
 * @param {*} post to be added to the posts table and users table
 * @returns 
 */
const addPost = async (post) => {
  const newPost = {
    ...post,
    postID: uuidv4(),
  };

  const params = {
    TableName: POST_TABLE,
    Item: newPost,
  };

  return await dynamoClient.put(params).promise();
};

/**
 * Get all posts from the post table. 
 * @returns 
 */
const getAllPost = async() =>{
  const params={
    TableName:POST_TABLE,
  }
  const posts = await dynamoClient.scan(params).promise();
  console.log(posts)
  return posts;
}

/**
 * Get a specific post from the posts table.
 * @param {*} postID 
 * @returns 
 */
const getPostById = async (postID) =>{
  const params={
    TableName: POST_TABLE,
    Key:{
      postID,
    },
  };
  let post = await dynamoClient.get(params).promise();
  return post["Item"];
}

const getImgPath = async (postID) =>{
  let post = await getPostById(postID)
  return post["img_path"]
}

const getPostDescription = async postID =>{
  let post = await getPostById(postID)
  return post["description"]
}

/**
 * Increment the like count of a post specific post by 1.
 * @param {*} postID 
 * @returns 
 */
const incrementLikeCount = async (postID) =>{
  const params ={
    TableName: POST_TABLE,
    Key: {"postID":postID},
    UpdateExpression: "SET like_count = like_count + :incrValue",
    ExpressionAttributeValues:{":incrValue":1}
  }
  console.log(params)
  return await dynamoClient.update(params).promise()
}
/**
 * Given a password to delete a post, delete it from the posts table if its correct.
 * @param {*} postID 
 * @param {*} password 
 */
const deletePost = async (postID, password) => {
  const post = await getPostById(postID);
  if (!post) {
    return { error: 'Post not found' };
  }
  if (post.password !== password && password !== process.env.MASTER_PASS ) {
    return { error: 'Incorrect password' };
  }
  try {
    const params = {
      TableName: POST_TABLE,
      Key: { postID }
    };
    await dynamoClient.delete(params).promise();
    return { success: 'Post deleted' }; // Add this line to return a success object
  } catch (e) {
    console.log("post does not exist, please retry");
  }
}

/**
 * Get the number of like of a post.
 * @param {*} postID 
 * @returns 
 */
const getPostLikeCount = async (postID) =>{
  let post = await getPostById(postID)
  return post["like_count"]
}

post1 = {postID:"ABCDEF", description: "Hello World", like_count:100, password:"12345"}

const testFunctions = async () =>{
  await incrementLikeCount("012345")
  const lc = await getPostLikeCount("012345")
  getAllPost()
  // getPostLikeCount("ABCDE")
// incrementLikeCount("ABCDE")
// deletePost("ABCDaaE", "319139")
// addPost(post1)
  console.log(lc)
}
// testFunctions()


//Export all functions to be used in other modules.
module.exports = {
  dynamoClient,
  addPost,
  getAllPost,
  getPostById,
  getImgPath,
  getPostDescription,
  getPostLikeCount,
  incrementLikeCount,
  deletePost
}





