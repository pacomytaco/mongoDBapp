//require packages
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.wsj.com", function (err, res, body) {
        // $ to use as selector
        var $ = cheerio.load(body);
        // new array
        var articles = [];
        console.log(articles); 

        $(".LS-SECONDARY-ALT").each(function(i, element) {
            var head = $(this).children(".wsj-headline-link").text().trim();
            var sum = $(this).children(".wsj-summary").text().trim();

            if (head && sum) {
                // Regex to remove extra lines, spacing, tabs
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            var addToArray = {
                headline: headNeat,
                summary: sumNeat
            }; 

            // push info to array yay
            articles.push(addToArray);
            }
        });
        // callback function sends articles
        cb(articles);
    });
};

module.exports = scrape;