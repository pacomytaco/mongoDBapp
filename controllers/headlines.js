//bring in scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

//bring in models
var Headline = require("../models/Headlines");

//functionality for articles 
module.exports = {

    //fetch will run scrape function
    fetch: function (cb) {
        scrape( function(data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }

            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs) {
                cb(err, docs);
            });
        });
    },

    delete: function(query, cb) {
        Headline.remove(query, cb);
    },

    get: function(query, cb) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc){
            cb(doc);
        });
    },

    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        },
        {}, 
        cb);
    }
};