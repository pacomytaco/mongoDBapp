

// var scrape = require("../scripts/scrape");

var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");


module.exports = function(router) {
    //route to render home
    router.get("/", function(req, res) {
        res.render("home");
    });
    //route to render saved
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function(req, res) {
        headlinesController.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "Check in tomorrow for new articles!"
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!" 
                });
            }
        });
    });

    router.get("/api/headlines", function(req, res) {
        // Run the headlinesController get method and pass in whether want saved, unsaved,
        // (or all headlines by default)
        headlinesController.get(req.query, function(data) {
          // Send the article data back as JSON
          res.json(data);
        });
      });
    
      // This route handles deleting a specified headline
      router.delete("/api/headlines/:id", function(req, res) {
        // Set the _id property of the query object to the id in req.params
        var query = { _id: req.params.id };
        // Run the headlinesController delete method and pass in query object containing
        // the id of the headline to delete
        headlinesController.delete(query, function(err, data) {
          // Send the result back as JSON to be handled client side
          res.json(data);
          
        });
      });
    
      // This route handles updating a headline, in particular saving one
      router.put("/api/headlines", function(req, res) {
        // Construct a query object to send to the headlinesController with the id of the headline to be saved
        // use req.body vs. req.params to make route easier to change if want to update a headline in any way 
        // except saving it
        headlinesController.update(req.body, function(err, data) {
          // After completion, send the result back to the user
          res.json(data);
        });
      });
    
      // This route handles getting notes for a particular headline id
      router.get("/api/notes/", function(req, res) {
        // Get all notes
        notesController.get({}, function(err, data) {
          // Send the note data back to the user as JSON
          res.json(data);
        });
      });
    
      // This route handles getting notes for a particular headline id
      router.get("/api/notes/:headline_id", function(req, res) {
        var query = { _id: req.params.headline_id };
        // Get all notes that match query using the notesController get method
        notesController.get(query, function(err, data) {
          // Send the note data back to the user as JSON
          res.json(data);
          //console.log("Routes query; ", query, "err: ", err, "data: ", data);
        });
      });
    
      // This route handles deleting a note of a particular note id
      router.delete("/api/notes/:id", function(req, res) {
        var query = { _id: req.params.id };
        // Use the check function from the headlines controller, which checks all articles, sorted by id number
        notesController.delete(query, function(err, data) {
          // Send the article data to a json
          res.json(data);
        });
      });
    
      // This route handles saving a new note
      router.post("/api/notes", function(req, res) {
        //console.log("post note: ", req.body);
        notesController.save(req.body, function(data) {
          // Send the note to the browser as a json
          res.json(data);
        });
      });
    };
    





//     router.get("/api/headlines", function( req, res) {
//         var query = {};

//         //unless specified req will return everything in json 
//         if (req.query.saved) {
//             query = req.query;
//         }

//         headlinesController.get( query, function(data){
//             res.json(data);
//         });
//     });

    
//     router.delete("/api/headlines/:id", function(req, res) {
//         var query = {};
//         query._id = req.params.id;
//         headlinesController.delete(query, function (err, data) {
//             res.json(data);
//         });
//     }); 

//     router.patch("/api/headlines", function(req, res) {
//         headlinesController.update(req.body,function(err, data) {
//             res.json(data);
//         });
//     }); 

//     router.get("/api/notes/:headline_id?", function(req, res) {
//         var query = {};
//         if (req.params.headline_id) {
//             query._id = req.params.headline_id;
//         }

//         notesController.get(query, function(err, data) {
//             res.json(data);
//         });
//     });

//     router.delete("/api/notes/:id", function(req, res) {
//         var query = {};
//         query._id = req.params.id;
//         notesController.delete (query, function(err, data) {
//             res.json(data);
//         });
//     });

//     router.post("/api/notes", function(req, res) {
//         notesController.save(req.body, function(data) {
//             res.json(data);
//         });
//     });
// }