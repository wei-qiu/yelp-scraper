const AWS = require('aws-sdk');
const request = require('request-promise');

const list = [
    "urban-light-at-lacma-los-angeles",
    "the-museum-of-contemporary-art-los-angeles",
    "the-last-bookstore-los-angeles"
];

function deployScraper(businessName) {  
    const lambda = new AWS.Lambda({
        region: "us-east-1"
    });

    const params = {
        FunctionName: "yelp-scraper-dev-scrape",
        InvocationType: "RequestResponse",
        LogType: "Tail",
        Payload: JSON.stringify(businessName)
    };

    return lambda.invoke(params, function(error, data){

        if(error){

            console.log(JSON.stringify(error));
            return new Error(`Error scraping: ${JSON.stringify(error)}`);

        } else if (data) {

            console.log(data);
            return JSON.stringify(data);
        }
    });
}

function swarm(arr) {

    arr.forEach(businessName => {
        deployScraper(businessName);
    });
}

swarm(list);