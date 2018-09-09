//require package
var mongoose = require("mongoose");
//create new schema using mongoose
var Schema = mongoose.Schema;

//create new schema that requires headline + summary
var headlineSchema = new Schema ({
    headline: {
        type: String,
        required: true,
        //unique - to prevent scraping the same articles 
        unique: true,
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean, 
        //change to true if user saves article
        default: false
    }
});

// .model() - create and read documents from db
var Headline = mongoose.model("Headline", headlineSchema);
module.exports = Headline;