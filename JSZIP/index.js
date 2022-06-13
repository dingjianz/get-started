const JSZip = require("jszip");
const zip = new JSZip();

// create a file
zip.file("hello.txt", "Hello[p my)6cxsw2q");
// oops, cat on keyboard. Fixing !
zip.file("hello.txt", "Hello World\n");

// create a file and a folder
zip.file("nested/hello.txt", "Hello World\n");
// same as
zip.folder("nested").file("hello.txt", "Hello World\n");
