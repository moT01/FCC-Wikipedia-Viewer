$(document).ready(function () {
    var query, url, thumburl, firsthalf, lasthalf, ratio, wscroll;
    
    //this function gets the info from wikipedia
    function getwiki() {
        //this clears .contentwrap in the html to make room for new content
        $(".contentwrap").empty();
        //this gets the info from the wiki url
        $.getJSON(url, {format: 'json'}, function (wikiobj) {
            //this goes through each object
            $.each(wikiobj.query.pages, function (k, v) {
                //this checks if the json has an image
                if (v.thumbnail !== undefined) {
                    //this set variables for the next test to determine the image size
                    firsthalf = (v.thumbnail.source.lastIndexOf('px-')) - 2;
                    lasthalf = v.thumbnail.source.slice(firsthalf + 2, v.thumbnail.source.length);
                    firsthalf = v.thumbnail.source.slice(0, firsthalf);
                    ratio = (v.thumbnail.height / v.thumbnail.width);

                    //this sets the size of the image displayed according to its width to height ratio
                    //the url for the image has the size in it and can be changed to desired size
                    //example "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/N%26SWJR_1853.gif/47px-N%26SWJR_1853.gif"
                    //create new url with 60px as the width
                    //if this image has the ratio for the first test it would replace the 47 in the example with a 60
                    if (ratio >= 1.75) {
                        thumburl = firsthalf + '60' + lasthalf;
                    } else if (ratio >= 1.25) {
                        thumburl = firsthalf + '70' + lasthalf;
                    } else if (ratio <= 1.25) {
                        thumburl = firsthalf + '120' + lasthalf;
                    } else {
                        thumburl = firsthalf + '90' + lasthalf;
                    }
                    //if object has an image
                    $(".contentwrap").append("<div class=\"contentwrap2\"><a href=\"https://en.wikipedia.org/?curid=" + v.pageid + "#/media/File:" + v.pageimage + "\" target=\"_blank\"><img class=\"thumbnail\" src=\"" + thumburl + "\"></a><div class=\"title\">" + v.title + "</div><div class=\"article\">" + v.extract + "</div><a href=\"https://en.wikipedia.org/?curid=" + v.pageid + "\" class=\"moreinfo\" target=\"_blank\">MORE</a></div>");
                } else {
                    //if object has no image
                    $(".contentwrap").append("<div class=\"contentwrap2\"><div class=\"title\">" + v.title + "</div><div class=\"article\">" + v.extract + "</div><a href=\"https://en.wikipedia.org/?curid=" + v.pageid + "\" class=\"moreinfo\" target=\"_blank\">MORE</a></div>");
                } //end else
            }); //end $.each
        }); //end $.getJSON
    } //end getwiki()*/
    
    //this gets the searched info from wiki when the form is submitted
    $("#formid").submit(function (e) {
        e.preventDefault();
        query = $("#searchid").val();
        url = "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=0&gsrlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=6&exlimit=max&gsrsearch=" + query + "&callback=?";
        getwiki();
    });

    //this gets random info from wiki when random is clicked
    $(".randombutton").click(function () {
        url = "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&grnlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=6&exlimit=max&callback=?";
        getwiki();
    });

    //this function is for the background scroll speed
    $(window).scroll(function () {
        wscroll = $(this).scrollTop();
        $("body").css({"background-position" : "center " + wscroll / 1.1 + "px"});
    });//end $(window).scroll
}); // end $(document).ready