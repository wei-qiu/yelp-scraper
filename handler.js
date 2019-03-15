'use strict';

const { getPage, parsePage, saveRatingsToDB, deployScrapers } = require('./utils');

module.exports.scrape = (event, context, callback) => {

    //1. fetch page;
   getPage(event)
     //2. parge the page; 
    .then(page => parsePage(page))
     //3. save the ratings to DB
    .then(yelpData => saveRatingsToDB(yelpData, event))
    .then(() => {
      console.log(context);
      // callback(null, {         
      //     statusCode: 200,
      //     body: JSON.stringify({
      //       message: `scraped ${event}`
      //   })     
      // })
      }
    )
    .catch(error => 
      //console.log(new Error(`Error scraping ${event}: ${JSON.stringify(error)}`))
      callback(new Error(`Error scraping ${event}: ${JSON.stringify(error)}`))
    );    
};


module.exports.launch_scrapers = (event, context, callback) => {

  //list of business name
  const list = [
    "urban-light-at-lacma-los-angeles",
    "the-museum-of-contemporary-art-los-angeles",
    "the-last-bookstore-los-angeles"
  ];

  //launch a lambda for each business
  list.forEach(businessName => {
    deployScrapers(businessName);
  })

}