const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of this project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'What is the purpose of this project?',
    },
    {
      type: 'input',
      name: 'install',
      message: 'How is this project installed?',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'How is this project used?',
    },
    {
      type: 'list',
      name: 'licence',
      message: 'Please choose a licence:',
      choices: ['AUR','GNU','GPL','MIT']
    },
    {
      type: 'input',
      name: 'contributon',
      message: 'Who is contributing to this project?',
    },  
    {
      type: 'input',
      name: 'testing',
      message: 'Do you have test data to add?',
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your Github user name?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
  },
  ]);
}

function generateREADME(response) {
    return `
  # ${response.title}
  
  # Table of Contents
  
  - [Description](#Description)
  - [How to install](#Installation)
  - [How to use this app](#Usage)
  - [Licence info](#Licence)
  - [Contributors](#Contributors)
  - [Testing](#Testing)
  - [Questions](#Questions)
  
  ## Description:
  ![licence](https://img.shields.io/badge/License-${response.licence}-blue.svg "Licence Badge")

    ${response.description}

  ## Installation:
    ${response.install}

  ## Usage:
    ${response.usage}

  ## Licence:
  NOTICE! - This application has the following licence type: ![licence](https://img.shields.io/badge/License-${response.licence}-blue.svg "Licence Badge")

  Please visit https://opensource.org/licenses/ for more information.

  ## Contributors:
    ${response.contributon}

  ## Testing:
    ${response.testing}
    
  ## Questions:
  The repository for this application can be found at: https://github.com/${response.github}

  You can also reach me directly at: ${response.email}
  `
}

async function init () {
  try {
    const response = await promptUser();
    const generate = generateREADME(response);
    await writeFileAsync('README.md', generate);
    console.log('Successfully wrote to README.md');
  }
    catch(err) {
    console.error(err);
  }
}

init();