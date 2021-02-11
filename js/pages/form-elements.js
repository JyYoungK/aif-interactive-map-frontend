$(document).ready(function() {
    
    "use strict";
    
    $('.summernote').summernote({
	  height: 350
	});
    
    $('.date-picker').datepicker({
        orientation: "top auto",
        autoclose: true
    });
    
    $('#cp1').colorpicker({
        format: 'hex'
    });
    $('#cp2').colorpicker();
    
    var input = $('#timepicker1').clockpicker({
        placement: 'bottom',
        align: 'left',
        autoclose: true,
        'default': 'now'
    });

    document.getElementById("firebase-submit-button").onclick = function () { //Entering new Data

        // Quick setup
        var name = $("#name").val();
        var username = $("#username").val();
        var category = $("#category").find(":selected").text();
        var selectedCountry = $("#region").find(":selected").text();
        var tag = $("#tag").val();
        var input = $("#input").code();

        //Add data to firebase
        var database = firebase.database();
        var usersRef = database.ref("users"); //Users Tree

        if (name == "") {
            alert("Please enter your name!");
        }
        else if (category == "- Resource Categories -"){
            alert("Please select Resource Categories!");
        }
        else if (selectedCountry == "- Countries and Regions -"){
            alert("Please select Countries and Regions!");
        }
        else {
            //Check if user exists first
            var userExists = database.ref("users/" + name);

            userExists.once("value")
                .then(function(userinDB){
                    if (userinDB.exists()){ //if username exists only create new category, update
                        var categoryExists = database.ref("users/" + name + "/Category/" + category);
                        
                        categoryExists.once("value")
                        .then(function(categoryinDB){
                            if (categoryinDB.exists()){ //if username exists only create new category, update
                                usersRef.child(name).child("Category").child(category).push({
                                    selectedCountry: selectedCountry,
                                    tag: tag,
                                    input: input,
                                    category: category,
                                });
                                window.location.href="sdg/climate.html";
                            }
                            else{
                                firebase.database().ref('users/' + name + '/Category/' + category).push({
                                    selectedCountry: selectedCountry,
                                    tag: tag,
                                    input: input,
                                    category: category,
                                });
                                window.location.href="sdg/climate.html";
                            }
                        });
                    }
                    else{//if not, create new
                        usersRef.child(name).child("Category").child(category).push({
                            selectedCountry: selectedCountry,
                            tag: tag,
                            input: input,
                            category: category,
                        });  
                        window.location.href="sdg/climate.html";
                    }
                });
        }

    }
});