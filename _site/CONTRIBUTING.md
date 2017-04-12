Contributing to NUSOracle
====================================================

Foreword
------------
Hello there dear reader! Congratulations! By reading this, you have taken your first step in contributing to the web app that will ultimately determine the roadmap of all NUS students ahead.

By understanding some of the guidelines we have set in this document, we hope you will be able to contribute to this repository in an organized fashion! Of course, these are merely guidelines so they are not set in stone. Feel free to propose changes if you think it will improve the system.

Table Of Contents
------------
[Things to know before I get started](#things-to-know)
* [Setting Up](#setting-up)
[How can I contribute?](#how-to-contribute)
* [Reporting bugs](#bugs)
* [Feature Improvement suggestions](#improvement)
* [New feature suggestions](#new)
[Workflow](#workflow)
[Folder structure](#folder)
* [Top level](#top-level)
* [Imports](#imports)
[Style-guide](#style)
* [API](#api)
* [UI](#ui)
[Additional Notes](#additional-notes)
* [Pull Requests and commit](#pull-requests)   

Things to know before I get started
------------

# Setting Up
To begin contributing to the codebase, it is highly recommended you clone the repository and setup the development environment. You can find out how to setup NUSOracle in the INSTALL.md file.

How can I contribute?
------------

### Reporting bugs

Bugs are logged inside our Github issue tracker page

#### Pre-conditions

> Ensure that you have already checked the following locations to prevent duplicate reports

* The NUSOracle FAQs page that contains a list of known issues
* Do a cursory search in our GitHub issue tracker to find out if the bug has already been filed

Once the pre-conditions are fulfilled, ensure that your issue has the following information

* A concise title that describes the bug in layman terms
* Describe how the bug is replicated in the description
* Tag it with the [BUG] tag
* If you have an idea where the bug is occurring, tag it with the relevant tag
  * Eg. If it has to do with the graduation checker not calculating your unrestricted electives correctly, tag it under [LOGIC]
* If you have implemented the bug fix
  * Link it to the pull request

### Feature Improvement suggestions
Improvement suggestions are logged inside the Github issue tracker page

#### Pre-conditions

> Ensure that you have already checked the following locations to prevent duplicate reports

* It improves the performance of an existing section of the code
* It structures the code differently to the original
  * Eg. The graduation requirement JSON information in the logic component is formatted differently from the UI because of how logic manipulates the information. A feature improvement would be to create a new graduation requirement logic component that can calculate it in the same format as the UI.
* This feature improvement has not yet been suggested

Once the pre-conditions are fulfilled, ensure that your issue has the following information

* A concise title that describes the part of the code you wish to modify in layman terms.
* Give a high level explanation of how your solution would improve the feature
* Tag it with the [IMPROVEMENT] tag and the part of the code base it will be modifying
  * Eg. The suggestion would be using an algorithm to perform module retrieval by indexing modules differently. Therefore, you should tag it with the [DATABASE] and [LOGIC] tag.
* If you have not implemented the improvement
  * List down the folders and the files you wish to modify and improve in the description
* If you have implemented the improvement
  * Link it to the pull request

### New feature suggestions
New feature suggestions are logged into the Github issue tracker page. Use this if you wish to implement a new feature but are unsure if this is the right way to do it and we can discuss it there!

#### Pre-conditions
> Ensure that the issue you are opening fulfils at least one of the following condition to be considered as a new feature

* The feature does not already exists inside our GitHub issue tracker
* The feature does not exist in our codebase
* The feature can be integrated into our code architecture without changing significant portions of the code

Note that your new feature suggestions will most likely change and be broken down into smaller issues that can be understood for implementation.

Once the pre-conditions are fulfilled, ensure that your issue has the following information

* A high level title that describes your new feature
* Provide a layman explanation of how you are going about implementing this feature.
* Provide a link to the pull request if you have already done the implementation so that people can look at it and how to improve it
* Provide an explain where in the architecture this new feature would fit in.

Workflow
----------------

To facilitate the approval of pull requests, we suggest the following set of procedures when writing code for contribution

- Create the relevant folders inside /imports. You can find how the folders are structured in the Folder Structure section.
- Inside the folder, create your .js or .jsx file and write your code inside as defined in the style-guides section
- Create test cases for all the functions and different possible scenarios that might happen when this function runs. How test cases are written is documented in the Tests section
  * For UI code, create your test cases inside the ui/components/common/ui-tests folder
  * For non-UI code, create your test cases in the same folder as where you wrote your .js file

Folder structure
---------------------------

Folder structure differs between UI and the API. This section explains how folders are structured to ensure consistency

### Top level
* .meteor
  * Where all meteor packages downloaded from Atmosphere reside
* client
  * Contains all the stylesheets and react.js elements. Also contains the main.js file that imports from /imports/startup that renders the page
* imports
  * Contains all the main codebase of the system
* public
  * Contains all the images, fonts and module json files that are exposed to the public
* server
  * Contains main.js file that imports from server startup inside imports
* Wiki
  * Contains the files referenced to in our Github Wiki page

### Imports

* api
  * Contains all the non-UI code base. With reference to the architecture, it contains the Student Logic controller, Profile logic, Database handler, Database conversion and Database export code
* startup
  * Client folder contains the Router information
  * Server folder contains fixtures that will run on startup
* ui
  * Contains all the React components that is used in the UI. With reference to the architecture, it contains Student View
* utils
  * Contains all the utility functions that the project uses

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
