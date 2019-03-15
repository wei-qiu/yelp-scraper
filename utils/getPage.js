const request = require('request-promise');

module.exports = (businessName) => {
    const url = `https://www.yelp.com/biz/${businessName}`;
    console.log(url);
    return request({method: 'GET', url: url});
};