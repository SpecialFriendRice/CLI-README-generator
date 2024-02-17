const inquirer = require('inquirer');
const fs = require('fs');

//is util needed to handle asynchronous behaviour?
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
return inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },

    {
        type: 'input',
        name: 'desc',
        message: 'Enter a description for the project, in one or two sentences',
    },

    {
        type: 'input',
        name: 'inst',
        message: 'What are the installation instructions?',
    },

    {
        type: 'input',
        name: 'usage',
        message: 'Please provide instructions for how to use the app, giving practical examples of usage',
    },

    {
        type: 'input',
        name: 'contrib',
        message: 'What are the guidelines for those wanting to contribute to this app? Use the standard Contributor Covenant to structure your answer',
    },

    {
        type: 'input',
        name: 'tests',
        message: 'Please give examples of tests that can be run on this app and give examples of how to carry this out',
    },

    {
        type: 'list',
        name: 'license',
        message: 'Which license template would you like to use?',
        choices: ['MIT', 'Apache', 'GNU', 'Mozilla'],

        // RE THE ABOVE, STILL TO DO: When a user chooses a license for their application from a list of options then a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
        //it's HARD to find licence badges - shall I tailor my choices above to what I can find online? How many options shall I list. Does it have to be the same licence options as GitHub?
        //badges seem to be generally added to the "header" area next to the title
        //Do i need to write a separate function to say if answers.license === GNU etc? A shortcut might actually be just to use a badge generating website where the url just has the licence name at the end of it, so embed it as an image with the url and a ${answers.license} in it

    },
   
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your GitHub username',
    },

    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address',
    },
  ]);
}

//below generates a string template literal for the MARKDOWN from the above input (inherently called answers by node and/or inquirer?)
function generateREADME(answers) {
return `
# ${answers.title}        ![license badge](https://img.shields.io/badge/License-${answers.license}-blue.svg)

## ${answers.desc}
    
## Table of Contents

* [Installation](#installation)
* [Requirements](#requirements)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
      
## Installation
    
${answers.inst}
    
## Requirements

* Node.js v6 or later
* NPM 
* Inquirer node.js module
    
## Usage 
    
${answers.usage}

## License

This application is covered by the ${answers.license} license. See the LICENSE file for more details.
    
## Contributing

${answers.contrib}

## Tests

${answers.tests}
    
## Questions?

You can get in touch with any queries (remember to include the name of the app and the type of system you are working on) via: 

http://github.com/${answers.github}

or email

${answers.email}
    `;
   
  }
    //TO DO LIST FOR ABOVE MD FILE
    //normally would include a link to the repo itself, but is this even possible??
    //Do I need the requirements/dependencies here or are they for the README for the actual repo?


  //how does using writeFileSync differ from writeFileAsync (bootcamp slides solution used the latter)?

  promptUser()
  .then(function(answers) {
    const readmetext = generateREADME(answers);
    return writeFileAsync('README.md', readmetext);
  })
  .then(function() {
    console.log("You now have a README file");
  })
  .catch(function(err) {
    console.log(err);
  })