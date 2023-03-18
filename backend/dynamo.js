const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({region: process.env.AWS_DEFAULT_REGION,
accessKeyId:process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME= "Users";

const getUsers = async () => {
  const params= {
    TableName: TABLE_NAME
  };
  const users = await dynamoClient.scan(params).promise();
  console.log(users)
  return users;
}

getUsers();

const addUsers = async (user) =>{
  const params={
    TableName: TABLE_NAME,
    Item: user
    }
  return await dynamoClient.put(params).promise();
}

const testUser = {"userID": "2", "name": "Chun", "posts": []}

// addUsers(testUser);

