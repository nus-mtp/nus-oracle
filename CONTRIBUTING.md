Contributing to NUS Oracle
===========================

Foreword
--------
Hello there dear reader! Congratulations! By reading this, you'd have taken your first step towards contributing to the web app that will ultimately determine the study plan roadmap of allllllll NUS students!!! :D

By understanding some of the guidelines we have set here, we hope that you'll be able to contribute to this repository in an organized fashion! Of course, these are merely guidelines so they are not set in stone. Feel free to propose changes if you think it will improve the system.

Table Of Contents
-----------------
* [Things to know before you get started](#things-to-know-before-you-get-started)
  * [Setting Up](#setting-up)
* [How can I contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Feature Improvements](#feature-improvements)
  * [Suggestions for New Features](#suggestions-for-new-features)
* [Workflow](#workflow)
* [Folder structure](#folder-structure)
* [Style-guide](#style-guide)
  * [API](#API_(Logic_and_Database))
  * [UI](#ui)
* [Additional Notes](#additional-notes)
  * [Pull Requests and Commits](#pull-requests-and-commits)   

Things to know before you get started
-------------------------------------

# Setting Up
To begin contributing to the codebase, it is highly recommended that you clone the repository and setup your development environment. You can find out how to set up NUS Oracle from a set of installation instructions for Mac/Windows users [here](https://github.com/nus-mtp/nus-oracle/blob/master/INSTALL.md).

How can I contribute?
---------------------
### Reporting Bugs
Bugs are logged inside our GitHub issue tracker page, with the [BUG] tag.

#### Checklist before filing a bug report!
Be sure to do the following to see if we already have an existing issue that's similar to yours:
* Read through the list of known issues in the NUSOracle FAQs page
* Do a cursory search in our GitHub issue tracker to find out if that bug has already been filed

Once you're sure that you have a *hot* new bug in your hands, do remember to include the following in your filed issue:
* A concise issue title that describes the bug in layman terms
* Steps to reproduce the bug in the issue's description
* [BUG] label tagged to your issue
* An additional label identifying a specific part of the code/component where the bug is occurring
  * Eg. If it has to do with the graduation checker not calculating unrestricted electives correctly, tag it under [GRADCHECKER]
* A link to your pull request that contains the bug fix

### Feature Improvements
Improvement suggestions are logged inside the GitHub issue tracker page, with the [IMPROVEMENT] tag.

#### Checklist before submitting issues for feature improvements!
Please make sure that your suggestion:
* Improves the performance of an existing section of the code
* Refactors or improves upon the existing code structure
  * E.g. The Graduation Requirement JSON schema in the `Logic` component is formatted differently from the UI's required schema because of how `Logic` manipulates this information. A feature improvement would be to create a new Graduation Requirement `Logic` component that can calculate it and format the result into the required schema for the UI.
* Has not been suggested before

Once you're super certain that you've got a great way to improve NUS Oracle's codebase or logic, do remember to include the following in your filed issue:
* A concise title that describes the part of the code you wish to modify in layman terms.
* An explanation of how your solution would improve a particular feature or part of the codebase.
* [IMPROVEMENT] label and a label of the part of the codebase this improvement will be modifying
  * E.g. A suggestion might be to use an algorithm to perform module retrieval by indexing modules more efficient. Since this issue involves both the database and logic components, you should tag this issue with the [DATABASE] and [LOGIC] tag.
* List down the folders and the files you wish to modify and improve in the description (optional)
* A link to your pull request that contains the improvement

### Suggestions for New Features
New feature suggestions are logged into the GitHub issue tracker page. Use this if you wish to implement a new feature but are unsure if this is the right way to do it and we can discuss it there!

#### Checklist before submitting issues for feature improvements!
First, please ensure that the issue you are creating does not already exist inside our GitHub issue tracker. Note that your new feature suggestions may be changed and be broken down into smaller issues used for implementation.

Once you're confident that your suggested feature would benefit many NUS students, ensure that your filed issue has the following information:
* A title that describes your new feature.
* A layman explanation of how you are going about implementing this feature.
* A link to the pull request if you have already done the implementation so that people can look at it and how to improve it.
* An rough explanation about how this new feature would fit into the existing architecture.

Workflow
---------
To facilitate the approval of pull requests, we suggest the following this set of procedures when writing code for contribution
- Create relevant folders inside `/imports` related to your feature. You can find how the folders are structured in the Folder Structure section below.
- Inside the folder, create your .js or .jsx file and write your code inside as defined in the style-guides section below.
- Create test cases for all the functions and different possible scenarios that might happen when this function runs. How test cases are written is documented in the Tests section below as well.
  * For UI code, create a folder named `/ui-tests` in the same folder containing your implemented UI component, if no `/ui-tests` folder currently exists. You may then put all the test cases for UI components within the enclosing folder into `/ui-tests`.
  * For code related to Logic/Database, create your test cases in the same folder where you wrote your .js file. It is optional to create a specific folder for test cases here.

Folder structure
----------------
This section explains how folders are structured in NUS Oracle.

```
.
├── .vagrant
    Your Vagrant machines are stored here
├── .meteor
|   metadata related to Meteor is stored here. You may find information regarding our Meteor version and Meteor package dependencies
├── client
    └── stylesheets
        CSS Classes used in our project
    └── main.js
        Main entry point, client-side, that sets up the site's navigation routes, e.g. for the homepage, to determine which component should be rendered
├── imports
    └── api
        Domain logic is all contained within this folder, named after their architecture component counterparts
    └── startup
        Scripts needed to handle the modules to be invoked upon app startup
        └── client
            Handles React routes used to render the correct UI components for a particular page
        └── server
            Handles initial server-side code initialization for accounts setup and fixtures for fake data
    └── ui
        └── components
            Contains all the React components used in the View layer
            └── account
                Contains UI components related to account management, e.g. Login, Signup, Forget Password, Acad Details
            └── common
                Contains often-reused generic React components, e.g. Module, Button or Form Inputs
            └── sidebar_menu
                Contains all UI components contained in the sidebar on the left of the screen
            └── study_plan
                Contains all UI components contained in the study plan area on the right of the screen
        └── pages
            Contains top-level React components used mainly for navigation. E.g. Dashboard.jsx handles what account-related component gets rendered onscreen and how the Sidebar and Study Planner on the right get rendered.
    └── utils
        Utility functions used throughout the application - server and client side
├── node_modules
    Contains all node packages. Please do not commit any file here into the repository.
├── public
    Contains all the images, fonts and module JSON files that are exposed to the public
├── server
    Contains a main.js file that imports server startup scripts and manages account setup
├── wiki    
     Contains the image files referenced to in our Github Wiki page
```

Style-guide
-----------
This is how the project code and folders are organized. The API and UI follow different conventions so make sure to follow these general rules when writing your code.

### API (Logic and Database)
#### Folders and files
Folders at the top level are named according to the architecture diagram
* methods.js
  * Contains all the functions for this sub-folder
* Folder-name.tests.js
  * Contains the test cases for functions defined in methods.js
* Folder-name.js
  * Contains any self defined Javascript objects as defined in Object-Oriented programming
* meteor-methods.js
  * Contains functions that wraps all the functions written in methods.js by meteor methods that handles input validation

#### In-code Documentation
* Provide comments for all functions above by describing what its parameters and return value types are.

### UI
#### Folders and files
Each folder should contain a number of React elements which are related
* ReactComponent.jsx
  * Contains a React component called "ReactComponent" based on its own class description
* ReactComponent.test.js
  * Contains the test cases for "ReactComponent". Test cases should then be added into the corresponding `./ui-tests` folder where all UI tests reside in

#### In-code Documentation
* Include a class description for every React component made, explaining what that component is for or how it might work. 
* Include `PropTypes` definitions for every React component to ensure that there is sufficient TypeChecking.
* (Optional) Include a `defaultProps` definition for every React component if you'd like to.

Additional Notes
-----------------
### Pull requests and Commits
For consistency, ensure that your pull requests and commits adhere to the following convention:

#### Commits
* The first word in a commit should be a verb in present tense and contain only capital letters
  * Eg. FIX bug where tab disappears when changing academic cohort
* Ensure that merged branches do not have the default merged messages. Provide a message that describes which branch you merged with or squash the commits.
  * Eg. MERGED with natasha UI branch

#### Pull requests
* If you are **not** a developer in the NUS Oracle team and you're making a pull request, make sure to merge it with the `development` branch only for testing purposes before we roll it out to the main branch.
* If you are in the NUS Oracle developer team, create a branch with your name in it. If you wish to merge into the `development` branch, you may merge into it using only the branch with your name.  

