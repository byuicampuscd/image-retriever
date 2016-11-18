(function () {

    function setLocalStorage(filmInput, searchResult) {

        let retrievedFiles,
            saver;

        if (localStorage["imageRetrieverImageFiles"]) {
            console.log("exisit");
            retrievedFiles = JSON.parse(localStorage["imageRetrieverImageFiles"]);
            retrievedFiles[filmInput] = searchResult;
            localStorage["imageRetrieverImageFiles"] = JSON.stringify(retrievedFiles);
        } else {
            console.log("no exisit", searchResult);

            saver = {};
            saver[filmInput] = searchResult;

            localStorage["imageRetrieverImageFiles"] = JSON.stringify(saver);
        }

    }

    function readLocalStorage(tempFilmNumber) {
        let picArray;

        if (localStorage["imageRetrieverImageFiles"]) {

            picArray = JSON.parse(localStorage["imageRetrieverImageFiles"]);

            return picArray[tempFilmNumber];
        } else {
            return null;
        }
    }

    function errorMessage(message) {
        var p = document.createElement("p"),
            textError = document.createTextNode(message),
            imageViewerChild = document.getElementById("filmDis").firstChild;

        p.appendChild(textError);

        document.getElementById("filmDis").removeChild(imageViewerChild)

        document.getElementById("filmDis").appendChild(p);
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
     * Displays the image(s) in the filmDis div.
     ******************************/
    function displayImg(searchResult) {

        let filmDis = document.getElementById("filmDis");

        filmDis.innerHTML = "";

        for (let i = 0; i < searchResult.length; i++) {

            let iframe = document.createElement("iframe");

            if (i === 0) {

                iframe.src = searchResult[i];

                filmDis.appendChild(iframe);

            } else {

                iframe.src = searchResult[i];

                filmDis.appendChild(iframe);

            }
        }
    }

    /******************************
     * Loads an image from the History tab on the side of
     * the screen.
     ******************************/
    function loadHis(number) {
        // Searches for the number typed in the text box
        let searchResult = searchFilms(number);
        // Test result
        if (searchResult === "none") {

            errorMessage("That microfilm has been removed, sorry.");

            return;
        }

        // If a match is found, it displays it to the screen in an image viewer
        displayImg(searchResult);

    }

    /*****************
     * Loads local storage and creates the history list.
     *****************/
    function loadHistory() {

        var ul = document.querySelector("aside ul");

        ul.innerHTML = "";

        // Looks for local storage of each microfilm
        for (var i = 0; i < records.length; i++) {

            var tempFilmNumber = records[i].number;

            if (readLocalStorage(tempFilmNumber)) {

                var li = document.createElement("li"),
                    anchor = document.createElement("a"),
                    text = document.createTextNode(tempFilmNumber);

                anchor.onclick = e => {
                    loadHis(e.target.innerText);
                };

                anchor.appendChild(text);

                li.appendChild(anchor);

                ul.appendChild(li);
            }
        }
    }

    /******************************
     * When search button is pushed it searches for a microfilm,
     * displays it if found, or error message if not, and
     * stores a link in a local storage.
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

        // Set search data into localstorage
        setLocalStorage(filmInput, searchResult);

        loadHistory();

        // Resets the search box
        filmInput = "";
    }

    /*EVENTS*/

    document.querySelector("#clear").onclick = e => {
        localStorage["imageRetrieverImageFiles"] = "";
        loadHistory();
    }

    /**********************************
     * Loads the history tab right when the window opens.
     **********************************/
    window.onload = function () {
        loadHistory();
    };

    document.querySelector("input[type='button']").onclick = search;
}());
