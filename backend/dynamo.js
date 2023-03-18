const AWS = require('aws-sdk');
require('dotenv').config();

// AWS setting
AWS.config.update({region: process.env.AWS_DEFAULT_REGION,
accessKeyId:process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const USER_TABLE= "Users";
const POST_TABLE= "posts";

/**
 * post structute:
 * "postID" : id of the post
 * "description" : description of the post
 * "img path": image path / s3 bucket path of the photo
 * "userID": ID of the user that uploaded the photo
*/

/**
 * User structure:
 * "userID": the primary key of the user, should be a unique string.
 * "name": account name / nick name of the user
 * "posts" an array of post item of the user. 
 */

/**
 * Get all users from the Users table.
 * @returns all users in the Users table
 */
const getUsers = async () => {
  const params= {
    TableName: USER_TABLE
  };
  const users = await dynamoClient.scan(params).promise();
  console.log(users)
  return users;
}

getUsers();

/**
 * Create a new user and add it to the users table.
 * @param {*} user 
 * @returns 
 */
const addUsers = async (user) =>{
  const params={
    TableName: USER_TABLE,
    Item: user
    }
  return await dynamoClient.put(params).promise();
}

/**
 * Get a specific user item from the users table by the userID.
 * @param {*} userID 
 * @returns 
 */
const getUserById = async (userID) => { 
  const params={
    TableName: USER_TABLE,
    Key:{
      userID,
    },
  };
  return await dynamoClient.get(params).promise();
}

/**
 * Delete an user with a specific user id.
 * @param {*} userID of the user to be deleted
 * @returns 
 */
const deleteUser = async(userID) => {
  const params={
    TableName: USER_TABLE,
    Key:{
      userID,
    },
  };
  return await dynamoClient.delete(params).promise();
}

/**
 * Add a post to the posts table and users table
 * @param {*} post to be added to the posts table and users table
 * @returns 
 */
const addPost = async(post)=>{
  const params={
    TableName: POST_TABLE,
    Item: post
  }
  updateUserPosts(post)
  return await dynamoClient.put(params).promise();
}

/**
 * Get the user id from the post and add the post to the 'posts' attribute of the user
 * @param {*} post to be appended to the specific user.
 * @returns 
 */
const updateUserPosts = async(post)=>{
  const userItem = await getUserById(post['userID'])

  console.log(userItem)

  const user = userItem["Item"]
  console.log(user)

  const postArr = user['posts']
  console.log(postArr)

  user['posts'].push(post);
  console.log("post pushed")

  const params={
    TableName: USER_TABLE,
    Item: user
  }
  return await dynamoClient.put(params).promise();

}

const getUserPost = async(userID) =>{
  const userItem = await getUserById(userID)
  const user = userItem['Item']
  console.log(user["posts"])
  return user["posts"]
}

//Export all functions to be used in other modules.
module.exports = {
  dynamoClient,
  getUserById,
  getUsers,
  addUsers,
  deleteUser,
  addPost,
  getUserPost
}





