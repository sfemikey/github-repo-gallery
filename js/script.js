//Global variable where your profile information will appear
const overview = document.querySelector(".overview");
const username = "sfemikey";
//create variable to select unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
//added two new variable for repos and repo-data class
const repoInformation = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
//create two variables to select a button and input
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

//create async function to fetch info from your github api 
const fetchUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //call the function displaying the user info
    displayUserInfo(data);
};
//call the function to see your results
fetchUserInfo();

//display the fetched user information on the page
const displayUserInfo = function (data) {
    //create a new div with a "user-info" class
    const div = document.createElement("div");
    div.classList.add("user-info");
    //populate the div, use json data to grab relevant properties
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
    //append the div to the overview element
    overview.append(div);
    gitFetchRepos();
};

//function to fetch your repos
const gitFetchRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

const displayRepos = function (repos)  {
    //show the filterInput element
    filterInput.classList.remove("hide");
    //loop and create a list item for each repo
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        // give each item a class of "repo" and <h3> element with the repo name
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        //append the list item to the global variable
        repoList.append(repoItem);
    }
};

//Add a click event
repoList.addEventListener ("click", function (e) {
    //Add a conditional statement to check if the event target matches the h3 element
    if (e.target.matches("h3")) {
        //target innertext where the event happens
        const repoName = e.target.innerText;
        //replace the console.log() with a call to this async function, passing repoName as an argument.
        getSpecificRepoInfos(repoName);  
    }
});

//create a function to get specific repo info
const getSpecificRepoInfos = async function (repoName) {
    //fetch request to grab information about the specific repository
    const fetchRepoInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    console.log(repoInfo);  

    //create an array of languages
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    //add each language to an empty array
    const languages = [];
    //use for..in loop to add the languages to the end of the array.
    for (const language in languageData) {
        languages.push(language);
    }

    //call the function to display the repo info
    displayReposInfo(repoInfo, languages);
};

//Create a Function to Display Specific Repo Info
const displayReposInfo = function (repoInfo, languages) {
    viewReposButton.classList.remove("hide");
    //empty the HTML of the section with a class of "repo-data" 
    repoData.innerHTML = "";
    //Unhide (show) the "repo-data" element. 
    //Hide the element with the class of "repos".
    repoData.classList.remove("hide");
    repoInformation.classList.add("hide");
    //create new div element
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    //Append the new div element to the section with a class of "repo-data"
    repoData.append(div);
};

//add a click event to the back button
viewReposButton.addEventListener ("click", function () {
    //unhide (display) the section with the class of "repos"
    repoInformation.classList.remove("hide");
    //add the "hide" class to the section where the individual repo data will appear
    repoData.classList.add("hide");
    //add the "hide" class to the Back to Repo Gallery button itself.
    viewReposButton.classList.add("hide");
});

//display the input element
filterInput.addEventListener ("input", function (e) {
    //capture the value of the search text
    const searchText = e.target.value;
    //select ALL elements on the page with a class of "repo"
    const repos = document.querySelectorAll(".repo");
    //assign it to the lowercase value of the search text
    const searchLowerText = searchText.toLowerCase();

    //Loop through each repo inside your repos element
    for (const repo of repos) {
        //assign it to the lowercase value of the innerText
        const repoLowerText = repo.innerText.toLowerCase();
        //If the repo contains the text, show it. If it doesn't contain the text, hide the repo.
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});



