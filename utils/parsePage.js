const cheerio = require('cheerio');

module.exports = (page) => {
    try{
        console.log("paring page...");
        const $ = cheerio.load(page);
        const rating = $(".rating-info .i-stars")
        .attr("title")
        .trim()
        .split(" ")[0];
        
        const reviewCount = $(".rating-info .review-count")
        .text()
        .trim()
        .split(" ")[0];

        const yelpData = {
            rating,
            reviewCount
        };

        return Promise.resolve(yelpData);

    } catch(err){
        return Promise.reject(`Error parsing page: ${JSON.stringify(err)}`);
    }
};