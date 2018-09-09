//require package
var mongoose = require("mongoose");
//create new schema using mongoose
var Schema = mongoose.Schema;

//create new schema that requires headline + summary
var noteSchema = new Schema ({
    //to attach note to the article
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String,
});

// .model() - create and read documents from db
var Note = mongoose.model("Note", noteSchema);
module.exports = Note;