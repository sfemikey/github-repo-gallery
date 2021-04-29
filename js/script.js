//Global variable where your profile information will appear
const overview = document.querySelector(".overview");
    const username = "sfemikey";

//create async function to fetch info from your github api 
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //call the function displaying the user info
    displayUserInfo(data);
};
//call the function to see your results
gitUserInfo();

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
};



