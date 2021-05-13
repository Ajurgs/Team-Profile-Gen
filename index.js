const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

let team = [];

const questionsGeneric = [
  {
    type: "input",
    message: "what is the employees name?",
    name: "name",
  },
  {
    type: "input",
    message: "what is the employees id?",
    name: "id",
  },
  {
    type: "input",
    message: "what is the employees email?",
    name: "email",
  },
];

function askToAdd() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What type of employee would you like to add?",
        choices: ["Manager", "Engineer", "Intern", "No More"],
        name: "type",
      },
    ])
    .then((answer) => {
      toAdd(answer.type);
    });
}

function toAdd(type) {
  switch (type) {
    case "Manager": {
      addManager();
      break;
    }
    case "Engineer": {
      addEngineer();
      break;
    }
    case "Intern": {
      addIntern();
      break;
    }
    case "No More": {
      buildHtml();
      break;
    }
  }
}

function addManager() {
  let questions = [...questionsGeneric];
  questions.push({
    type: "input",
    message: "what is the employees office number?",
    name: "officeNum",
  });
  inquirer.prompt(questions).then((answers) => {
    // create class
    let newManager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNum
    );
    // add to array of team
    team.push(newManager);
    askToAdd();
  });
}

function addEngineer() {
  let questions = [...questionsGeneric];
  questions.push({
    type: "input",
    message: "what is the employees github?",
    name: "github",
  });
  inquirer.prompt(questions).then((answers) => {
    // create class
    let newEngineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
    );
    // add to array of team
    team.push(newEngineer);
    askToAdd();
  });
}

function addIntern() {
  let questions = [...questionsGeneric];
  questions.push({
    type: "input",
    message: "what is the employees school?",
    name: "school",
  });
  inquirer.prompt(questions).then((answers) => {
    // create class
    let newIntern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
    );
    // add to array of team
    team.push(newIntern);
    askToAdd();
  });
}

function buildHtml() {
  // write to html file
  fs.writeFileSync(
    path.join(__dirname, "index.html"),
    buildTemplate(),
    (err) => {
      err ? console.error(err) : console.log("Html built");
    }
  );
}

function buildTemplate() {
  let template = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
      crossorigin="anonymous"
    />

    <title>My Team</title>
  </head>
  <body>
    <header class="container-fluid bg-danger d-flex justify-content-center">
      <h1>My Team</h1>
    </header>
    <main class="container d-flex flex-wrap">
      ${addTeamCards()}
    </main>
  </body>
</html>
    `;
  return template;
}

function addTeamCards() {
  let temp = "";
  team.forEach((member) => {
    switch (member.getRole()) {
      case "Manager": {
        temp += `
                <div class="card m-2" style="width: 18rem">
                    <div class="card-header">
                        <h1 class="card-title">${member.getName()}</h1>
                        <h3 class="card-subtitle">${member.getRole()}</h3>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${member.getId()}</li>
                            <li class="list-group-item">Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a> </li>
                            <li class="list-group-item">Office Number: ${member.getOfficeNum()}</li>
                        </ul>
                    </div>
                </div>`;
        break;
      }
      case "Engineer": {
        temp += `
                <div class="card m-2" style="width: 18rem">
                    <div class="card-header">
                        <h1 class="card-title">${member.getName()}</h1>
                        <h3 class="card-subtitle">${member.getRole()}</h3>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${member.getId()}</li>
                            <li class="list-group-item">Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a></li>
                            <li class="list-group-item">Github: <a href="https://github.com/${member.getGithub()}">${member.getGithub()}</a></li>
                        </ul>
                    </div>
                </div>`;
        break;
      }
      case "Intern": {
        temp += `
                <div class="card m-2" style="width: 18rem">
                <div class="card-header">
                    <h1 class="card-title">${member.getName()}</h1>
                    <h3 class="card-subtitle">${member.getRole()}</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${member.getId()}</li>
                        <li class="list-group-item">Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a></li>
                        <li class="list-group-item">School: ${member.getSchool()}</li>
                    </ul>
                </div>
                </div>`;
        break;
      }
    }
  });
  return temp;
}
