const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({region: process.env.AWS_DEFAULT_REGION,
accessKeyId:process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const USER_TABLE= "Users";
const POST_TABLE= "posts";

const getUsers = async () => {
  const params= {
    TableName: USER_TABLE
  };
  const users = await dynamoClient.scan(params).promise();
  console.log(users)
  return users;
}

getUsers();

const addUsers = async (user) =>{
  const params={
    TableName: USER_TABLE,
    Item: user
    }
  return await dynamoClient.put(params).promise();
}

const getUserById = async (userID) => { 
  const params={
    TableName: USER_TABLE,
    Key:{
      userID,
    },
  };
  return await dynamoClient.get(params).promise();
}

const deleteUser = async(userID) => {
  const params={
    TableName: USER_TABLE,
    Key:{
      userID,
    },
  };
  return await dynamoClient.delete(params).promise();
}

const addPost = async(post)=>{
  const params={
    TableName: POST_TABLE,
    Item: post
  }
  updateUserPosts(post)
  return await dynamoClient.put(params).promise();
}

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


const testPost = {"postID" : "00003", "description": "My second post2", "img_path": "fake_path", "userID": "2"}

const testUser = {"userID": "2", "name": "Chun", "posts": []}

// addUsers(testUser);

// addPost(testPost)

getUserPost("2")


module.exports = {
  dynamoClient,
  getUserById,
  getUsers,
  addUsers,
  deleteUser
}

