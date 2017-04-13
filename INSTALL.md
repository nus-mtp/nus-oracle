Installing the Coding Environment
====================================================

Table of Content
------------

* [Installing the necessary development environment](installing-the-necessary-development-environment)
  * [Meteor.js](installing-meteor.js)
  * [Vagrant](installing-vagrant)
* [Other coding environment setup](other-coding-environment-setup)
  * [Atom Text Editor](atom-text-editor)
* [Footnotes](footnotes)

Installing the necessary development environment
------------

There are 2 ways you can set up the development environment to work on the code base.
* Installing Meteor.js
* Using Vagrant

> We recommend installing Meteor in your machine as the development environment as it is the primary source of new updates and any changes will be reflected in the meteor environment first.

### Installing Meteor.js

+ Download Meteor on to your machine by going to the [Meteor](https://www.meteor.com/install#!) website
  * For Unix / OSX users, run _**"curl https://install.meteor.com/ | sh"**_ in the terminal
  * For Windows, download the installer provided on their website
+ Clone our repository
+ Enter the root directory of the cloned repository using _**"cd"**_. Ensure that it is running on Meteor version
1.4.x by typing _**"meteor --version"**_
+ Enter _**"meteor npm install"**_ to install all npm package dependencies into the folder
+ Run the meteor app with the command "meteor"
+ Go to localhost:3000 on your browser and the front page of our website should render!

### Installing Vagrant

+ Install [Vagrant](https://www.vagrantup.com/downloads.html) and [Virtual Box](https://www.virtualbox.org/wiki/Downloads), the one that states "Virtual Box 5.1.18 platform packages"
+ Run _**"vagrant up"**_ to initialize the default provisioner, ubuntu/trusty64
+ Enter the Virtual box VM with _**"vagrant ssh"**_
+ Run _**"mkdir -p nus_oracle/.meteor/local"**_ 
  * check the footnotes for why this must be done
+ Run _**"sudo mount --bind /home/vagrant/nus_oracle/.meteor/local/vagrant/.meteor/local"**_ 
  * check the footnotes for why this must be done
+ Run _**"cd/vagrant"**_ to move to the directory
+ Run _**"meteor"**_ in that directory to run the code on your local machine!
+ Exit the VM by running _**"exit"**_
+ Release the resources used by the VM using _**"vagrant destroy"**_
+ Check out the following links for additional help in setting up the Vagrant environment
  * [How to use vagrant on Windows](http://tech.osteel.me/posts/2015/01/25/how-to-use-vagrant-on-windows.html)
  * [Meteor in Window using Vagrant](https://gist.github.com/gabrielhpugliese/5855677)

Other coding environment setup
----------------------------------

### Atom Text Editor

> Our team uses Atom as the text editor environment to code the project. It is fairly lightweight and has many useful
packages that can be found easily inside the in-built package manager browser.

#### Installing Atom

* To install Atom, head over to the [atom.io](https://atom.io)
* You can also find a use list of Atom shortcut buttons on this [github page](https://github.com/nwinkler/atom-keyboard-shortcuts)

#### Important configurations in Atom

#### Useful packages in Atom

> All these packages can be found and downloaded by going to the top-bar, click on "Atom" and selecting the "Preference"
tab

* Emmet
  * Press Tab for syntax shortcuts for HTML, CSS less. Cheatsheet can be found [here](https://docs.emmet.io/cheat-sheet/)
* Language-javascript-jsx
  * Coloring for React jsx syntax
* Minimap
  * See your code structure on the side
* Project manager
  * Easy access between different projects in Atom
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
----------------------------------

### Why create a directory inside Vagrant?

The 2 commands that you have to run here is to change the default location where meteor stores the temporary database when running the code on a local machine. The information should be stored in the VM partition rather than the main computer (the partition that your current computer is running on) so this command enables that change
