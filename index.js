const inquirer = require('inquirer');
const fs = require('fs');


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

      
        //I have used shields.io to generate generic template badges and another option is https://badgen.net/#static/license/MIT/blue But are there official badges like with Creative Commons? Do license options have to be the same as GitHub?

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

//below generates a string template literal for the MARKDOWN from the above input 
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
* [Credits](#credits)
      
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

## Credits

Referred to own notes from course, Xpert Learning Assistant for syntax queries and StackOverflow/W3Schools for background reading. Module 11 Mini-project code re-used as basis for structure.
    `;
   
  }


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