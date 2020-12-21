function userInformationHTML(user){
    return `<h2>${user.name}
                <span class="small-name">
                    (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
                </span></span>
            </h2>
            <div class="gh-content">
                <div class="gh-avatar">
                    <a href="${user.html_url} target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}">
                    </a>
                </div>
                <p>Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>
            </div>`;
}

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
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`) // the promise when this happens that happens
    ).then(
        function(response){
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData)); // the that
        }, function(errorResponse){
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else{
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                )
            }
        })
}