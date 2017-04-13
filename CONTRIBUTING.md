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
  * [Top level](#top-level)
  * [Imports](#imports)
* [Style-guide](#style-guide)
  * [API](#api)
  * [UI](#ui)
* [Additional Notes](#additional-notes)
  * [Pull Requests and commit](#pull-requests-and-commit)   

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

### Top level
```
.
├── _config.yml
├── _drafts
|   ├── begin-with-the-crazy-ideas.textile
```
`/.meteor`
  * All meteor packages downloaded from [Atmosphere](https://atmospherejs.com/) reside here
`/client`
  * Contains all the stylesheets and HTML files. Also contains the main.js file that imports from /imports/startup that renders the page
`/imports`
  * Contains most of the functions, classes and UI components. 
    `/api`
       * Contains all the non-UI code base. With reference to the architecture, it contains the Student Logic controller, Profile logic, Database handler, Database conversion and Database export code
    `/startup`
       * Client folder contains the Router information
       * Server folder contains fixtures that will run on startup
    `/ui`
       * Contains all the React components that is used in the UI. With reference to the architecture, it contains Student View
    `/utils`
       * Contains all the utility functions that the project uses
`/public`
  * Contains all the images, fonts and module JSON files that are exposed to the public
`/server`
  * Contains the main.js file that imports from server startup inside imports
`/wiki`
  * Contains the files referenced to in our Github Wiki page

### Imports


Style-guide
-----------

This is how the project code and folders are organized. Both API and UI follow different conventions so make sure to follow these general rules when writing your code.

### API

#### Folders and files

Folders at the top level are named according to the architecture diagram.
Any subfolders are grouped logically as defined by the coder
At the lowest level, there should be at least 2 files that describes the sub-folder

* methods.js
  * Contains all the functions for this sub-folder
* Folder-name.tests.js
  * Contains the test cases for functions defined in methods.js

* Folder-name.js
  * Contains any self defined Javascript objects as defined in Object-Oriented programming
* meteor-methods.js
  * Contains functions that wraps all the functions written in methods.js by meteor methods that handles input validation

#### Code

* Imports should be kept at the top of the file and it should only use the meteor defined “imports” and not the jQuery version “require()”
* Comment all functions above by describing what the parameters are.

### UI


Additional Notes
-------------------

### Pull requests and commit
For consistency, ensure that your pull requests and commits adhere to the following convention

#### Commits
* The first word in a commit should be a verb in present tense and capital letters
  * Eg. FIX bug where tab disappears when changing academic cohort
* Ensure that merged branches do not have the default merged messages. Provide a message that describes which branch you merged with or squash the commits.
  * Eg. MERGED with natasha UI branch

#### Pull requests
* If you are not a developer in the NUSOracle team but are making a pull request, make sure to merge it with the dev branch only
* If you are in the NUSOracle team, create a branch with your name in it. If you wish to merge into the dev branch, use only the branch with your name.
