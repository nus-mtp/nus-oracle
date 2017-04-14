Setting up your Development Environment
=======================================

Table of Contents
-----------------
* [Overview](#overview)      
* [Meteor](#installing-meteor)        
* [Running the app](#running-nus-oracle)
* [Vagrant](#installing-vagrant)
* [Accessing the development database](#accessing-the-development-database)        
* [Running test cases](#running-test-cases)
* [Coding Environment Setup](#coding-environment-setup)         
  * [Atom Text Editor](#atom-text-editor)         
* [Footnotes](#footnotes)       


Overview
--------
There are 2 ways for you to set up your development environment.
* Install Meteor
* Set up a virtual environment using Vagrant

> We recommend the first option to install **Meteor** as it is the primary source of new updates and any changes will be reflected in the Meteor environment first.

Installing Meteor
-----------------
Meteor is the full-stack web application platform that NUS Oracle is built on. Learn more about Meteor at their official website [here](http://docs.meteor.com/#/full/).
+ Download Meteor on to your machine by going to the official Meteor website [here](https://www.meteor.com/install)
  * For Unix / OSX users, run `curl https://install.meteor.com/ | sh` in the terminal
  * For Windows users, you should download the installer provided on the above website
+ Clone our repository
+ Enter the root directory of the cloned repository using `cd`. Ensure that it is running on Meteor version
1.4.x by typing `meteor --version`

Running NUS Oracle
------------------
+ Run the command ``meteor npm install`` to install all npm package dependencies
+ Run the app with the command `meteor`
+ Go to `localhost:3000` on your browser and the front page of our website should be displayed on your browser!

Installing Vagrant
-------------------
Vagrant is a tool for developers to easily create a virtual environment on your local computer that mimics NUS Oracle's own development environment. If you're familiar with handling virtual environments or want to ensure your own local environment is consistent with ours, please try this method out.        

**Instructions for both Mac and Windows users:**
+ Install [Vagrant](https://www.vagrantup.com/downloads.html) and [Virtual Box](https://www.virtualbox.org/wiki/Downloads), the one that states "Virtual Box 5.1.18 platform packages"
+ Download the nus-oracle vagrant box from this [link](https://drive.google.com/open?id=0BxPzpcyaJ1SjM0dENExvNlhRV2s)
+ Add the vagrant box into your list of vagrant boxes with `vagrant box add nus_oracle nus_oracle.box`
+ Run `vagrant up` to initialize the nus_oracle box
  * Make sure you have our Vagrantfile in the same directory as where `vagrant up` was ran
+ Enter the Virtual box VM with `vagrant ssh`
+ Run `sudo mount --bind /home/vagrant/nus_oracle/.meteor/local /vagrant/.meteor/local`
  * check the [footnotes](#footnotes) for why this must be done
+ Run `cd/vagrant` to move to the directory
+ Run `meteor` in that directory to run the code on your local machine!
+ Exit the VM with the command `exit`
+ Release the resources used by the VM using `vagrant destroy`
+ Check out the following links for additional help in setting up your Vagrant environment
  * [How to use vagrant on Windows](http://tech.osteel.me/posts/2015/01/25/how-to-use-vagrant-on-windows.html)
  * [Meteor in Window using Vagrant](https://gist.github.com/gabrielhpugliese/5855677)

Accessing the development database
------------------------------------
Running `meteor` on the database would only give you access to test fixture information. If you wish to develop on a local machine with full access to a database, please contact us at `nusoracle@gmail.com` where we would provide you with the relevant files and details to how to run the application locally with full database access.

Running test cases
------------------
+ Run the app with the command `meteor npm run ci-test`. This command may be customized in the `package.json` file.
+ If you want to keep the test cases running in *watch mode*, set your environment variables like this: `TEST_CLIENT=0` and  `TEST_WATCH=1`. Please note that Windows users need to run `cmd` with administrator privileges.
+ Then, run the command `meteor test --driver-package dispatch:mocha`

Coding Environment Setup
------------------------
This is the coding environment setup that NUS Oracle uses. Here's a collection of all the helpful tools that we found throughout the course of our project.

These tools are optional for developing on NUS Oracle. However, if you're just starting out as a developer and you're not sure what kinds of tools you should use to help you code, here are some for you to try out!

### Atom Text Editor
Atom is a fairly lightweight text editor which has many useful packages that can be found easily inside its in-built package manager browser.

#### Installing Atom
* To install Atom, head over to the [atom.io](https://atom.io) website and follow the installation instructions.
* You can also find a use list of Atom shortcut buttons on this [github page](https://github.com/nwinkler/atom-keyboard-shortcuts).

#### Useful packages in Atom
Once you've installed Atom, you are now ready to download some useful packages that'll help you to write better code and making it much more enjoyable too! All these packages may be downloaded by clicking on `Atom` and selecting the `Preference` tab on the top navigation bar.

* Emmet
  * Press Tab for syntax shortcuts for HTML, CSS less. Cheatsheet can be found [here](https://docs.emmet.io/cheat-sheet/)
* Language-javascript-jsx
  * Syntax coloring for React jsx syntax
* Minimap
  * See your entire code structure on the side
* Project manager
  * Easy switch between different projects/folders within Atom
* Javascript-snippets
  * syntax shortcuts
* Atom-beautify
  * Auto-indent HTML, CSS, Javascript by simply right clicking and selecting beautify
* Sublime-Style-Column-Selection
  * Hold 'ALT' while typing to block select stuff
* Color-picker
  * Opens up a color picker so you can insert its corresponding HEX code
* Pigments
  * Displays color in your code to immediately see what color a HEX is


Footnotes
----------
### Why create a directory inside Vagrant?
The 2 commands that you have to run here is to change the default location where meteor stores the temporary database when running the code on a local machine. The information should be stored in the VM partition rather than the main computer (the partition that your current computer is running on) so this command enables that change
