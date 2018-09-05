var note = require ("../models/Notes");
var makeDate = require ("../models/date");

module.exports = { 
    get: function(data, cb) {
        note.find({
            _headlineId: data._id
        }, cb);
    },

    save: function(data, cb) {
        var newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };

        note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        });
    },

    delete: function(data, cb) {
        note.remove({
            _id: data._id
        }, 
        cb);
    }
};