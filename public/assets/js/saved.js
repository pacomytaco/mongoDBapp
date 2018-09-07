$(document).ready(function() {
    
    var artCont = $(".art-cont");
    $(document).on("click", ".btn.delete", handleArtDelete);
    $(document).on("click", ".btn.notes", handleArtNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete)

    initPage();

    function initPage() {
        artCont.empty();
        $.get("/api/headlines?saved=true").then(function(data){
            if (data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        //this function will append the HTML containing article data to page
//passed an array of JSON containing all available articles in database
        var artPanels = [];
        //pass each articls JSON object to createPanel function tht returns bootstrap panel with article data inside
        for (var i = 0; i< articles.length; i++) {
            artPanels.push(createPanel(articles[i]));
        }
        //once all of HTML for articles is stored in artPanels array, append them to artPanels Container

        artCont.append(artPanels);
    }

    function createPanel(article) {
        //this function takes single JSON object for an article/headline and construct a jQuery element containing all of the formatted HTML for artPanel
        var panel = $([
            "<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h3>",
            article.headline,
            "<a class='btn btn-success save'>",
            "Save Article", "</a>", "</hs>", "</div>",
            "<div class='panel-body'>",
            article.summary, "</div>",
            "</div>"
        ].join(""));
        //attach article's id to jquery element
        panel.data("_id", article._id);
        //return constructed panel jQuery element
        return panel; 
    }

    function renderEmpty() {
        //this function renders some HTML to page to explain if there are no new articles
        var emptyAlert = $([
            "<div class='alert alert-warning text-center'>",
            "<h4>No new articles today, check back tomorrow!</h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h3>What would you like to do?</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class='scrape-new'>Scrape New Articles</a></h4>",
            "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
            "</div>",
            "</div>"
        ].join(""));
        //appending this to page
        artCont.append(emptyAlert);
    }

    function renderNotesList(data) {
        var notesToRender = [];
        var currentNote;
        if (!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>",
                "No notes for this article!",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);
        } else {
            for (var i = 0 ; i < data.notes.length; i++) {
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.notes[i].noteText,
                    "<button class='btn btn-danger note-delete'>x</button>",
                    "</li>"
                ].join(""));

                currentNote.children("button").data("_id", data.notes[i]._id);
                notesToRender.push(currentNote);
            }
        }
        $(".note-container").append(notesToRender);
    }

    function handleArticleDelete() {
        var artToDelete = $(this).parents(".panel").data();
        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + artToDelete._id
        }).then(function(data) {
            if (data.ok) {
                initPage();
            }
        });
    }

    function handleArticleNotes() {
        var currentArt = $(this).parents(".panel").data();
        $.get("/api/notes/" + currentArt._id
    ).then(function(data) {
            var modalText = [
                "<div class='container-fluid text-center'>",
                "<h4>Notes for Article: ",
                currentArt._id,
                "</h4>",
                "<hr />",
                "ul class='list-group note-containerr'>",
                "</ul>",
                "<textarea placeholder='New Note' rows='4' cols='60'><textarea>",
                "<button class='btn btn-success save'>Save Note</button>",
                "</div>"
            ].join("");
            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            var noteData = {
                _id: currentArt._id,
                notes: data || []
            };
            $(".btn.save").data("article", noteData);
            renderNotesList(noteData);
        });
    }

    function handleNoteSave() {
        var noteData;
        var newNote = $(".bootbox-body textarea").val().trim();

        if (newNote) {
            noteData = {
                _id: $(this).data("article")._id,
                noteText: newNote
            };
            $.post("/api/notes", noteData).then(function() {
                bootbox.hideAll();
            });
        }
    }

    function handleNoteDelete() {
        var noteToDelete = $(this).data("_id");

        $.ajax({
            url: "/api/note/" + noteToDelete,
            method: "DELETE"
        }).then(function() {
            bootbox.hideAll();
        });
    }
    
});