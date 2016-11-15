function errorMessage(message) {
    var p = document.createElement("p"),
        textError = document.createTextNode(message),
        imageViewerChild = document.getElementById("filmDis").firstChild;

    p.appendChild(textError);

    document.getElementById("filmDis").removeChild(imageViewerChild)

    document.getElementById("filmDis").appendChild(p);
}

/******************************
 * Creates Cookie
 ******************************/
function createCookie(filmNumber, value, days) {
    var expires;
    if (days) {
        // Gets todays date and adds the number of days cookie lasts
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Adds days in ms form
        expires = "; expires=" + date.toUTCString(); // Creates string of expiration date
    } else {
        expires = "";
    }
    // Creates the cookie and stores it on computer
    document.cookie = filmNumber + "=" + value + expires + "; path=/";
}

/******************************
 * Reads a specified Cookie
 ******************************/
function readCookie(filmNumber) {
    var nameEQ = filmNumber + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        // Removes spaces before cookie stored in the string of multiple cookies
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        // Returns the value if cookie is found
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/******************************
 * Erases a Specified Cookie
 ******************************/
function eraseCookie(filmNumber) {
    createCookie(filmNumber, "", -1);
}

/*********************************
 * Search Films Function Opens an XML, searches for images stored in the resources
 * and returns the address to that image.
 *********************************/
function searchFilms(value) {
    var searchResult = [];

    for (var i = 0; i < records.length; i++) {

        var recordNum = records[i].number;

        if (recordNum === value) {
            for (var j = 0; j < records[i].urls.length; j++) {
                searchResult.push(records[i].urls[j]);
            }
            return searchResult;
        }
    }

    return "none";
}

/******************************
 * Loads an image from the History tab on the side of
 * the screen.
 ******************************/
function loadHis(number) {
    // Searches for the number typed in the text box
    var searchResult = searchFilms(number);
    // Test result
    if (searchResult == "none") {

        errorMessage("That microfilm has been removed, sorry.");

        return;
    }

    // If a match is found, it displays it to the screen in an image viewer
    displayImg(searchResult);

}

/*****************
 * Loads Cookies and creates the history list.
 *****************/
function loadHistory() {

    var ul = document.createElement("ul");

    // Looks for Cookies of each microfilm
    for (var i = 0; i < records.length; i++) {

        var tempFilmNumber = records[i].number;

        if (readCookie(tempFilmNumber) !== null) {

            var li = document.createElement("li"),
                anchor = document.createElement("a"),
                text = document.createTextNode(tempFilmNumber);

            anchor.onclick = e => {
                loadHis(tempFilmNumber);
            };

            anchor.appendChild(text);

            li.appendChild(anchor);

            ul.appendChild(li);
        }
    }

    document.querySelector("aside").appendChild(ul);

    return "none";
}

/******************************
 * Displays the image(s) in the filmDis div.
 ******************************/
function displayImg(searchResult) {
    for (var i = 0; i < searchResult.length; i++) {

        var iframe = document.createElement("iframe"),
            dist = document.getElementById("filmDis").firstChild;

        if (i == 0) {

            iframe.src = searchResult[i];

            document.getElementById("filmDis").removeChild(dist);

            document.getElementById("filmDis").appendChild(iframe);

        } else {

            iframe.src = searchResult[i];

            document.getElementById("filmDis").appendChild(iframe);

        }
    }
}

/******************************
 * When search button is pushed it searches for a microfilm,
 * displays it if found, or error message if not, and
 * stores a link in a cookie.
 ******************************/
function search() {

    var filmInput = document.getElementById('film-id').value;

    // Makes sure that the function isn't entered by accident
    if (filmInput === null || filmInput === "" || filmInput === "Type Film Number Here") {
        return;
    }

    // Searches for the number typed in the text box
    var searchResult = searchFilms(filmInput);

    // Test result
    if (searchResult === "none") {

        errorMessage("No Microfilm Found");

        // Resets the search box
        filmInput = "";
        return;
    }

    // If a match is found, it displays it to the screen in an image viewer
    displayImg(searchResult);

    // Creates a cookie with the name of the microfilm number
    createCookie(filmInput, searchResult, 120);

    loadHistory();

    // Resets the search box
    filmInput = "";
}

/*EVENTS*/

/**********************************
 * Loads the history tab right when the window opens.
 **********************************/
window.onload = function () {
    loadHistory();
};

document.querySelector("input[type='button']").onclick = search;
