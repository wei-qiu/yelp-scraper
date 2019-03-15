const uuid = require("uuid");
const AWS = require("aws-sdk");

//connect to DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (yelpData, businessName) => {
    const date =JSON.stringify(new Date());
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            businessName: businessName,
            reviewCount: yelpData.reviewCount,
            rating: yelpData.rating,
            scrapedAt: date
        }
    };

    console.log('put is about to be called.');

    dynamoDb.put(params, (error) => { 
         if(error) {
            console.log(`Error saving data to DynamoDB: ${JSON.stringify(error)}`);

            return Promise.reject(
                `Error saving data to DynamoDB:
                ${JSON.stringify(error)}`
            );
        } else {
            console.log(`put is called. ${JSON.stringify(params.Item)}`);
            return Promise.resolve(params.Item);         
        }
    });    
};