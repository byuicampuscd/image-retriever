/******************************
* Creates Cookie
******************************/
function createCookie(cName,value,days) {
   var expires;
   if (days) {
      // Gets todays date and adds the number of days cookie lasts
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000)); // Adds days in ms form
      expires = "; expires=" + date.toUTCString();       // Creates string of expiration date
   } else {
      expires = "";
   }
   // Creates the cookie and stores it on computer
   document.cookie = cName + "=" + value + expires + "; path=/";
}

/******************************
* Reads a specified Cookie
******************************/
function readCookie(cName) {
   var nameEQ = cName + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      // Removes spaces before cookie stored in the string of multiple cookies
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      // Returns the value if cookie is found
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}

/******************************
* Erases a Specified Cookie
******************************/
function eraseCookie(cName) {
   createCookie(cName,"",-1);
}

/*********************************
* Search Films Function
* Opens an XML, searches for
* images stored in the resources
* and returns the address to that
* image.
*********************************/
function searchFilms(value) {
	var searchResult = new Array();

	for (var i = 0; i < records.length; i++) {
		var recordNum = records[i].number;
		if (recordNum == value) {
			for (var j = 0; j < records[i].urls.length; j++) {
				searchResult[j] = records[i].urls[j];
			}
			return searchResult;
		}
	}

	return "none";
}

/*****************
* Loads Cookies
* and creates the
* history list.
*****************/
function loadHistory() {
   // Clears the history list
   document.querySelector("aside").getElementsByTagName("ul")[0].innerHTML = "";

   // Looks for Cookies of each microfilm
   for (var i = 0; i < records.length; i++) {
      var tempFilm = records[i].number;
      if (readCookie(tempFilm) !== null) {
        document.querySelector("aside").getElementsByTagName("ul")[0].innerHTML +=
        '<li style="display: inline-block; list-style-type: none; width: 75px; height: 17px; margin: 5px; text-align: center; font-family: verdana, geneva; font-size: 10pt; color: #343434; cursor:pointer;" onclick="loadHis(' + tempFilm + ')"><a>' + tempFilm + '</a></li>';
      }
   }
   return "none";
}

/******************************
* When search button is pushed
* it searches for a microfilm,
* displays it if found, or
* error message if not, and
* stores a link in a cookie.
******************************/
function search() {
   // Makes sure that the function isn't entered by accident
   if ((document.getElementById('mfsb').value == null) ||
	   (document.getElementById('mfsb').value == "") ||
	   (document.getElementById('mfsb').value == "Type Film Number Here")) {
     return;
   }

   // Searches for the number typed in the text box
   var searchResult = searchFilms(document.getElementById('mfsb').value);
   // Test result
   if (searchResult == "none") {
      document.getElementById("filmDis").innerHTML = '<p style="line-height: 400px; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;">No microfilm found.</p>';
      // Resets the search box
      resetPlaceholder(document.getElementById('mfsb'));
      return;
   }

   // If a match is found, it displays it to the screen in an image viewer
   displayImg(searchResult);

   // Creates a cookie with the name of the microfilm number
   createCookie(document.getElementById('mfsb').value,searchResult,120);

   loadHistory();

   // Resets the search box
   resetPlaceholder(document.getElementById('mfsb'));
}

/******************************
* Loads an image from the
* History tab on the side of
* the screen.
******************************/
function loadHis(number) {
   // Searches for the number typed in the text box
   var searchResult = searchFilms(number);
   // Test result
   if (searchResult == "none") {
      document.getElementById("filmDis").innerHTML = '<p style="line-height: 400px; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;">That microfilm has been removed, sorry.</p>';
      return;
   }

   // If a match is found, it displays it to the screen in an image viewer
   displayImg(searchResult);

}

/******************************
* This prepares the page.
******************************/
function clearPlaceholder(x) {
  if (x.value == "Type Film Number Here") {
    x.style.color = "black";
    x.value="";
  }
}

function fillPlaceholder(x) {
  if (x.value === "") {
    x.style.color = "grey";
    x.value="Type Film Number Here";
  }
}

function resetPlaceholder(x) {
  x.style.color = "grey";
  x.value="Type Film Number Here";
}

/******************************
* Displays the image(s) in the
* filmDis div.
******************************/
function displayImg(searchResult) {
  for (var i = 0; i < searchResult.length; i++) {
    if (i == 0) {
      document.getElementById("filmDis").innerHTML = '<iframe src="' + searchResult[i] + '" width="100%" height="400" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>';
    } else {
      document.getElementById("filmDis").innerHTML += '<iframe src="' + searchResult[i] + '" width="100%" height="400" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>';
    }
  }
}

/**********************************
* Loads the history tab right when
* the window opens.
**********************************/
window.onload = function() {
	loadHistory();
};
