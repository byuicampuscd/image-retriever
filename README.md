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
Here is the (demo)[https://content.byui.edu/file/92cc88d9-a083-4f8a-b8f1-ea8d2608f8fc/3/image-retriever.zip/image-retriever/index.html] found in BYU-Idaho CMS.

### For the Developer
The image retriever was recently updated as of 11/21/2016.  This version of the image retriever is compiled through Gulpjs and it utilizes Vanilla JS.  To redevelop this application, clone the repository and open the cloned repository in the command line.  Make sure you have Gulp globally installed.  A global gulp installation is `npm install -g gulp`.  Afterwards, install all the dependencies with `npm install`.  Then you may start the development with the gulp tasks found in gulpfile.js.