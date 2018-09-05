//require packages
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.wsj.com", function (err, res, body) {
        // $ to use as selector
        var $ = cheerio.load(body);
        // new array
        var articles = [];

        $(".LS-SECONDARY-ALT").each(function(i, element) {
            var head = $(this).children(".wsj-headline-link").text().trim();
            var sum = $(this).children(".wsj-summary").text().trim();

            var addToArray = {
                headline: head,
                summary: sum
            }; 

            // push info to array yay
            articles.push(addToArray);
        });
        // callback function sends articles
        cb(articles);
    });
};

module.exports = scrape;