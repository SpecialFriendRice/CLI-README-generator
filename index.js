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
        message: 'Please provide instructions for how to give use the app, giving practical examples of usage',
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
        name: 'licence',
        message: 'Which licence template would you like to use?',
        choices: ['MIT', 'Apache', 'GNU', 'Creative Commons'],

        // RE THE ABOVE, STILL TO DO: When a user chooses a license for their application from a list of options then a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
    },
   
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your GiHub username',
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
    # ${answers.title}

    ## ${answers.desc}
    

    ## Table of Contents

    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [License](#license)
    * [Contributing] (#contributing)
    * [Tests] (#tests)
    * [Questions] (#questions)
   
    ## Installation
    
    ${answers.inst}
    
    ## Usage 
    
    ${answers.usage}
    
    ## License
    
    This application is covered by the ${answers.licence} licence.
    
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
    //check that the above generates a working link!
    //make sure the table of contents is correct and that links/navigation works
    //normally would include a link to the repo, but is this even possible??


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