#NUS Oracle

## Vagrant box setup
> Note this is unconfirmed yet since our group should decide on the branch codes     

* Install [Vagrant](https://www.vagrantup.com/downloads.html) and [Virtual box](https://www.virtualbox.org/wiki/Downloads)
* Run the command "vagrant init ubuntu/trusty64" to initialize vagrant a environment
* Run the command "vagrant up", this should initialize your default provisioner, ubuntu/trusty64 in this case, and run all the commands as indicated in the Vagrantfile
* Enter the VM with "vagrant ssh"
* Run the command "mkdir -p nus_oracle/.meteor/local" then
* Run the command "sudo mount --bind /home/vagrant/nus_oracle/.meteor/local/ /vagrant/.meteor/local/"
* cd to the directory "/vagrant"
* Run the command "meteor" to run the code in your local machine!

#### Known issues
* Currently, only server test cases can be ran if webdriver is Chromium-selenium. Currently, the alternative would be to use phantomjs as the webdriver however this has not yet been tested
