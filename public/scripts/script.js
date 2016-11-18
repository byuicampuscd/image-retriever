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

    function writePrintr(source) {
        return "<html><head><script>function step1(){\n" +
            "setTimeout('step2()', 10);}\n" +
            "function step2(){window.print();window.close()}\n" +
            "</scri" + "pt></head><body onload='step1()'>\n" +
            "<img src='" + source + "' /></body></html>";
    }

    function printr(e) {

        let parent = e.target.parentElement || e.srcElement.parentElement,
            microfilm = parent.firstChild,
            hrefr = microfilm.src,
            filetype = hrefr.split('.').pop(),
            PageLink = "about:blank";

        if (filetype === "jpg" || filetype === "png") {
            var pwin = window.open(PageLink, "_blank");
            pwin.document.open();
            pwin.document.write(writePrintr(hrefr));
            pwin.document.close();
        } else if (filetype === "pdf") {
            let errDiv = parent.lastChild,
                errText = document.createTextNode("Microfilm is a PDF.  Print PDF from PDF view.  If that does not work then download it to then print it."),
                errPara = document.createElement("p");

            errPara.appendChild(errText);
            errDiv.appendChild(errPara);

            setTimeout(() => {
                errDiv.removeChild(errPara);
            }, 5000);
        }

    }

    function downloadr(e) {
        let parent = e.target.parentElement || e.srcElement.parentElement,
            microfilm = parent.firstChild,
            hrefr = microfilm.src,
            anchor = document.createElement("a");

        anchor.href = hrefr;
        anchor.download = true;

        anchor.click();
    }

    /******************************
     * Displays the image(s) in the filmDis div.
     ******************************/
    function displayImg(searchResult) {

        let filmDis = document.getElementById("filmDis");

        filmDis.innerHTML = "";

        for (let i = 0; i < searchResult.length; i++) {

            let iframe = document.createElement("iframe"),
                div = document.createElement("div"),
                print = document.createElement("input"),
                download = document.createElement("input"),
                filetype = searchResult[i].split('.').pop(),
                errDiv = document.createElement("div");

            print.onclick = printr;
            download.onclick = downloadr;

            print.value = "Print";
            download.value = "Download";

            print.type = "button";
            download.type = "button";

            print.className = "print";
            download.className = "download";

            div.className = "image";

            div.appendChild(iframe);

            if (filetype !== "pdf") {
                iframe.style.width = "80%";
                div.appendChild(print);
                div.appendChild(download);
                div.appendChild(errDiv);
            }

            if (i === 0) {

                iframe.src = searchResult[i];

                filmDis.appendChild(div);

            } else {

                iframe.src = searchResult[i];

                filmDis.appendChild(div);
            }
        }
    }

    /******************************
     * Loads an image from the History tab on the side of
     * the screen.
     ******************************/
    function loadImageSet(number) {
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
                    loadImageSet(e.target.innerText);
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
