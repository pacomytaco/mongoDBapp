//require package
var mongoose = require("mongoose");
//create new schema using mongoose
var Schema = mongoose.Schema;

//create new schema that requires headline + summary
var noteSchema = new Schema ({
    //to attach note to the article
    _headlineId: {
        type: schema.types.objectId,
        ref: "Headline"
    },
    date: string,
    noteText: string,
});

// .model() - create and read documents from db
var Note = mongoose.model("Note", noteSchema);
module.exports = Note;