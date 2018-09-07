$(document).ready(function() {

    var artCont = $(".art-cont");
    $(document).on("click", ".btn.save", handleArtSave);
    $(document).on("click", ".scrape-new", handleArtScrape);

    initPage();

    function initPage() {
        artCont.empty();
        $.get("/api/headlines?saved=false").then(function(data){
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

    function handleArtSave() {
        //triggered when user wants to save article
        //retrieve the article as a js object containing headline id
        var artToSave = $(this).parents(".panel").data();
        artToSave.saved=true;
        //use patch method since we are updating an existing record
        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: artToSave
        }) .then(function(data) {
            //if successful, mongoose will send back an object containing a key of "ok" with value of 1 to mean 'true'
            if (data.ok) {
                //run initPage again to reload entire list of articles
                initPage();
            }
        });
    }

    function handleArtScrape() {
        //function for scraping new articles
        $.get("/api/fetch")
        .then(function(data) {
            //if successful in scraping and comparing articles to those already in collection, 
            //re render articles on the page and let user know how many we were able to save
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
        });
    }
})