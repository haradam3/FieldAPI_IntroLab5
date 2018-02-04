//
// Copyright (C) 2015-2018 by Autodesk, Inc.
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
// Use, duplication, or disclosure by the U.S. Government is subject to
// restrictions set forth in FAR 52.227-19 (Commercial Computer
// Software - Restricted Rights) and DFAR 252.227-7013(c)(1)(ii)
// (Rights in Technical Data and Computer Software), as applicable.
//
// Written by: M.Harada. 2015.  
// Last updated 2/4/2018

// Lab5. Properties and Search 
// 
// This shows the sample usage of basic viewer functionalities. 
// Display properties of the selected element: 
//   Viewer3D.getSelection()
//   Viewer3D.getProperties() 
// 
// Search by keyword and isolate in the model: 
//   Viewer3D.search()
//   Viewer3D.isolate() 
//
// Doc: 
// https://developer.autodesk.com/en/docs/viewer/v2/reference/javascript/viewer3d/
//
// Usage e.g.: 
//      viewerGetProperties(_viewer, txtArea);
//      viewerSearch(_viewer, searchStr, txtArea);
//

//===================================================================
// Lab5. Get Properties 
//===================================

// For simplicity, we only show properties of one selected object here.

function viewerGetProperties(viewer, outputTextArea) {

    // Callback for view.getProperties() on success. 
    function propCallback(data) {

        // Check if we got properties. 
        if ((data.properties == null) || (data.properties.length == 0)) {
            outputTextArea.value = "no properties";
            return;
        }

        // Iterate over properties and put together 
        // a list of property's name/value pairs to diplay. 
        var str = "";
        var length = data.properties.length;

        for (var i = 0; i < length; i++) {
            var obj = data.properties[i];
            str += obj.displayName + ": " + obj.displayValue + "\n";
        }

        outputTextArea.value = str;
    }

    function propErrorCallback(data) {
        outputTextArea.value = "error in getProperties().";
    }

    //----------------------------------------
    // Main - Properties 
    //---------------------

    if (viewer.getSelection().length > 0) {
        var objSelected = viewer.getSelection()[0];
        viewer.getProperties(objSelected, propCallback, propErrorCallback);
    }
    else {
        outputTextArea.value = "Please select one element to show properties.";
    }
}

//===================================================================
// Lab5. Search  
//===================================

function viewerSearch(viewer, searchStr, outputTextArea) {

    // Callback for _viewer.search() on success. 
    function searchCallback(ids) {
        if (ids.length > 0) {
            viewer.isolate(ids);
            outputTextArea.value = ids;
        }
        else {
            outputTextArea.value = "nothing found.";
        }
    }

    // Callback for _viewer.search() on error. 
    function searchErrorCallback() {
        outputTextArea.value = "error in search().";
    }

    //---------------------------------------
    // Main - Search 
    //-----------------

    viewer.clearSelection();
    viewer.search(searchStr, searchCallback, searchErrorCallback);

}