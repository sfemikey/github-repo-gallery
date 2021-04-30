//Global variable where your profile information will appear
const overview = document.querySelector(".overview");
const username = "sfemikey";
//create variable to select unordered list to display the repos list
const repoList = document.querySelector(".repo-list");


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
    //loop and create a list item for each repo
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        // give each item a class of "repo" and <h3> element with the repo name
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        //append the list item to the global variable that sele
        repoList.append(repoItem);
    }
};





