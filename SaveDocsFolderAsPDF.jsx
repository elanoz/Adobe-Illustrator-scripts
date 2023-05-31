/**********************************************************

DESCRIPTION
	Based on the SaveDocsAsPDF.jsx script from Adobe Systems
	Copyright 2005 - see that file for full details.

    Saves the open document and every *.ai documents in 
    the opened Illustrator document folder as a PDF file in
    a the same document folder and
    add current date to the saved PDF name.

*********************************************************/

/** Saves every *.ai document on the open document folder
    as a PDF file on the same folder as the open document.
*/

// Main Code [Execution of script begins here]


try {

    // uncomment to suppress Illustrator warning dialogs
    // app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
    var doc = app.activeDocument;

    if (app.documents.length > 0) {


        // save PDf at the same file location
        var destFolder = null;
        var folderPath = doc.fullName.fullName;

        var destFolderPath = folderPath.substring(0, folderPath.lastIndexOf("/"));
        destFolder = destFolderPath;

        var aiFolder = new Folder(destFolderPath);
        var aiFiles = aiFolder.getFiles("*.ai");



        if (destFolder != null) {

            var options, i, sourceDoc, targetFile;

            // Get the PDF options to be used
            options = this.getOptions();
            // You can tune these by changing the code in the getOptions() function.

            
            for (i = 0; i < aiFiles.length; i++) {
                var file = aiFiles[i];
                if (file instanceof File) {
                    sourceDoc = aiFiles[i]; // returns the document object
                    var aiFile = app.open(sourceDoc);

                    // Get the file to save the document as pdf into
                    targetFile = this.getTargetFile(sourceDoc.name, '.pdf', destFolder);

                    // Save as pdf
                    aiFile.saveAs(targetFile, options);
                    // Close the AI file without saving changes
                    aiFile.close(SaveOptions.DONOTSAVECHANGES);
                }
                // alert('Documents saved as PDF');
            }
        }
        else {
            throw new Error('There are no document open!');
        }
    }
}
catch (e) {
    alert(e.message, "Script Alert", true);
}

/** Returns the options to be used for the generated files.
    @return PDFSaveOptions object
*/
function getOptions() {
    // Create the required options object
    var options = new PDFSaveOptions();
    // See PDFSaveOptions in the JavaScript Reference for available options

    // Set the options you want below:
    options.pDFPreset = "PDF PRESET NAME";

    // For example, uncomment to set the compatibility of the generated pdf to Acrobat 7 (PDF 1.6)
    // options.compatibility = PDFCompatibility.ACROBAT7;

    // For example, uncomment to view the pdfs in Acrobat after conversion
    // options.viewAfterSaving = true;

    return options;
}

/** Returns the file to save or export the document into.
    @param docName the name of the document
    @param ext the extension the file extension to be applied
    @param destFolder the output folder
    @return File object
*/

function getTargetFile(docName, ext, destFolder) {
    var newName = "";

    // if name has no dot (and hence no extension),
    // just append the extension
    if (docName.indexOf('.') < 0) {
        newName = docName + ext;
    } else {

        // Get today's date to add to the name
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();

        // Format the date
        var formattedDate = " " + day + "-" + month + "-" + year;

        //concatenate the names

        var dot = docName.lastIndexOf('.');
        newName += docName.substring(0, dot);
        newName += formattedDate;
        newName += ext;
    }

    // Create the file object to save to
    var myFile = new File(destFolder + '/' + newName);

    // Preflight access rights
    if (myFile.open("w")) {
        myFile.close();
    }
    else {
        throw new Error('Access is denied');
    }
    return myFile;
}

function getDate() {
    var today = new Date();
    var date =
        today.getDate() + "" + (today.getMonth() + 1) + "" + today.getFullYear();
    return date;
}
