const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");

const copyright = document.createElement("font");
    copyright.innerHTML = "Curtis Clayton " + thisYear;
    footer.appendChild(copyright);

    const spacer = document.createElement("font");
    spacer.innerText = " | ";
    footer.appendChild(spacer);

    const gitHubLink = document.createElement("a");
    gitHubLink.href = "https://github.com/curt4207";
    gitHubLink.innerText = "GitHub";
    footer.appendChild(gitHubLink);

let skills = ["javaScript", "HTML", "CSS"];
const skillsSection = document.querySelector("#skills");

const skillsList = document.querySelector("#skills ul");

for(let i = 0; i < skills.length; i++){
    let skill = document.createElement("li");
    skill.innerText = skills[i];
    
    skillsList.appendChild(skill);
}


const messageForm = document.querySelector("[name=\"leave_message\"]");

    messageForm.addEventListener("submit", function(event){
    let name = event.target.name.value ;
    let email = event.target.email.value;
    let message = event.target.message.value;

    event.preventDefault();
    console.log(name +" " + email + " " + message);
    
    let messageSection = document.querySelector("#messages");
    let messageList = messageSection.querySelector("ul");
    let newMessage = document.createElement("li");
    newMessage.innerHTML = "<a href=\"mailto:" + email + "?subject=Emails about Portfolio\">"+ name +"</a> <span style=\"color:green;font-weight:bold\">"+ message +"</span>";

    let removeButton =document.createElement("button");
        removeButton.setAttribute("type", "button");
        removeButton.innerText = "remove";
        removeButton.classList.add("removeButton");
        

    removeButton.addEventListener("click", function(){
    let entry = removeButton.parentNode;
        entry.remove();
        
    });
    
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messageForm.reset();
});


fetch("https://api.github.com/users/curt4207/repos")
.then(response => response.json())
.then(function(repositories) {
    
    
    const projectSection = document.querySelector("#projects");
    const projectList = projectSection.querySelector("ul");

    for(let i = 0; i < repositories.length; i++){
        let project = document.createElement("li");
        let a = document.createElement("a");

        a.href = repositories[i].html_url;
        a.innerText = repositories[i].name;
        project.appendChild(a);
        

        projectList.appendChild(project);
        // console.log(repositories[i].html_url);
        
    }
})
.catch(error => console.log(error)); 

// switches to a new section Home/ About/ Exp/ windowId is the id for the section div//
function changeWindow(windowId){
    const displayWindow = document.getElementById("displayWindow");
    const section = document.getElementById(windowId.slice(1)) || document.getElementById("aboutMe");

    const mainContent = document.getElementById("mainContent");
    for (let i = 0; i < displayWindow.children.length; i++) {
        let child = displayWindow.children[i];
        mainContent.appendChild(child);
    }
    displayWindow.appendChild(section);
}
addEventListener("hashchange", function(){
    changeWindow(location.hash);
})
    changeWindow(location.hash);
// changeWindow("aboutMe");
// changeWindow("projects");