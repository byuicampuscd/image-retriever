# Image Retriever

## Elevator Pitch

With the Image Retriever, a user can simulate reading a microfilm image that comes from the CMS of BYU-Idaho.

## Overview

The FHGEN courses of BYU-Idaho that use this application will instruct the user on which codes to put into the image retriever in order to fetch the image file.  This application is to be used in an iframe of a content page, or as an external link in the LMS courses.

## Features 
1. Retrieve images based on a code identifier.
2. Image search history
3. Clear search history
4. Expand image
5. Download image
6. Print images

## Demo
Here is the [demo](https://content.byui.edu/file/92cc88d9-a083-4f8a-b8f1-ea8d2608f8fc/3/image-retriever.zip/image-retriever/index.html) found in BYU-Idaho CMS.

## To add images
1. Download the scripts.js file (right click>save link as...) from the image retriever tool in Equella.
2. Input the information to the scripts.js file according to the setup.
3. Double and Triple check your work to make sure everything looks correct. 
4. See that each item has a title, call number, and a link to the file. The link should have version 0 as well as integ/gen instead of file inside the URL.
5. Open the image retriever tool in Equella.
6. When open, choose "Create a new version" on the right.
7. Choose to replace the scripts.js file(note that this is the plural version)
8. Replace it with the file you just edited.**Be sure that the names of the file you are replacing is the same as the one you are uploading. THIS IS VITAL**
9. Click save in the top right corner to make your version go live.
10. For best tests, use the Image Retriever tool in FHGEN 212 to test the functionality for the files you just added. Fix any problems by creating a new version. (Jump back up to step 6.)

### For the Developer
The image retriever was recently updated as of 11/21/2016.  This version of the image retriever is compiled through Gulpjs and it utilizes Vanilla JS.  To redevelop this application, clone the repository and open the cloned repository in the command line.  Make sure you have Gulp globally installed.  A global gulp installation is `npm install -g gulp`.  Afterwards, install all the dependencies with `npm install`.  Then you may start the development with the gulp tasks found in gulpfile.js.
