function fetchGitHubInformation(event){

    var username = $("#gh-username").val(); //here we are using jquery to select the # id and then specifing we are targetting the value
    if (!username) {                    // if the var username is empty ie no value in the form > this happens
        $("#gh-user-data").html(`<h2>Please enter a Github username</h2>`);
        return;
    }

    $("#gh-user-data").html(  // this is the else part of the statement meaning if text has been inputted
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`
    );
}