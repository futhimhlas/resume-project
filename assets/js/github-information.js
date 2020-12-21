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

function repoInformationHTML(repos){
if (repos.length == 0){
    return `<div class="clearfix repo-lsit">No repos!</div>`;
}
var listItemsHTML = repos.map(function(repo){
    return `<li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>`;
});

return `<div class="clearfix repo-list">
            <p> <strong>Repo List:</strong>
            </p>
            <ul>
                ${listItemsHTML.join("\n")}
            </ul>
        </div>`;
}

function fetchGitHubInformation(event){
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");  // Empties the div

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
        $.getJSON(`https://api.github.com/users/${username}`), // the promise when this happens that happens
        $.getJSON(`https://api.github.com/users/${username}/repos`) 
    ).then(
        function(firstResponse, secondResponse){
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData))
            $("#gh-repo-data").html(repoInformationHTML(repoData)); // the that
        }, function(errorResponse){
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else if(errorResponse.status === 403){
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $("#gh-user-data").html(`<h4> Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`)
            } else{
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                )
            }
        })
}

$(document).ready(fetchGitHubInformation);