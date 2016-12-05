/*jslint browser: true*/
/*global $, singleCourseSearch*/
(function () {
    'use strict';
    //Inject Needed Scripts
    var scriptSrcs = [
        "https://content.byui.edu/integ/gen/92cc88d9-a083-4f8a-b8f1-ea8d2608f8fc/0/image-retriever.zip/dist/scripts.js"
    ];

    function addScript() {
        var src = scriptSrcs.shift(),
            scriptTag = document.createElement('script');
        scriptTag.src = src;
        if (scriptSrcs.length > 0) {
            scriptTag.onload = addScript;
        }
        document.body.appendChild(scriptTag);
    }

    function baseHTML() {
        document.querySelector("#article").innerHTML = `
    <main>
        <h1>Microfilm Retriever</h1>
        <label>Search Films:
            <input id="film-id" type="text" placeholder="Type Film Number Here" />
            <input type="button" value="Search">
            <input value="Clear History" type="button" id="clear">
        </label>
        <aside>
            <h3>Search History</h3>
            <ul></ul>
        </aside>
        <div id="filmDis">
            <div class="image" id="blank">
                <img src="https://content.byui.edu/integ/gen/92cc88d9-a083-4f8a-b8f1-ea8d2608f8fc/0/image-retriever.zip/images/mrIcon.png">
            </div>
        </div>
    </main>`;
    }

    baseHTML();
    addScript();
}());
