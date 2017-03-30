#!/bin/sh
set -e

if [-e /.installed]; then
  echo 'Already installed.'

else
  echo ''
  echo 'Installing'
  echo '----------'

  # install language package
  sudo apt-get install language-pack-en language-pack-en-base

  echo 'Adding language package'
  echo '----------'
  echo "export LANGUAGE=en_US.UTF-8
  export LANG=en_US.UTF-8
  export LC_ALL=en_US.UTF-8" >> /home/vagrant/.bashrc

  echo 'done!'
  echo '----------'

  # Add meteor package
  echo 'Adding meteor package'
  echo '----------'
  curl https://install.meteor.com/ | sh

  # include google chrome packages into apt-get
  # wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
  # sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

  # update app-get
  # apt-get update

  # echo 'done!'
  # echo '----------'

  # install zip/unzip
  # echo 'installing zip/unzip'
  # echo '----------'
  # sudo apt-get -y install zip unzip

  # echo 'done!'
  # echo '----------'

  # Install Chrome
  # echo 'installing google chrome'
  # echo '----------'
  # sudo apt-get -y install google-chrome-stable

  # wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  # sudo dpkg -i google-chrome-stable_current_amd64.deb
  # sudo apt-get -y install -f

  # echo 'done!'
  # echo '----------'

  # install google xvfb
  # echo 'installing google xvfb'
  # echo '----------'
  # sudo apt-get -y install xvfb
  # sudo apt-get -y install -f
  # echo 'done!'
  # echo '----------'

  # install jre
  # echo 'installing JRE'
  # echo '----------'
  # sudo apt-get -y install default-jdk
  # sudo apt-get -y install -f
  # echo 'done!'
  # echo '----------'

  # download chromedirver and selenium server
  # echo 'Downloading and Moving the ChromeDriver/Selenium Server to /usr/local/bin'
  # echo '----------'
  # cd /tmp
  # wget "http://chromedriver.storage.googleapis.com/2.8/chromedriver_linux64.zip"
  # wget "http://selenium-release.storage.googleapis.com/2.44/selenium-server-standalone-2.44.0.jar"

  # unzip chromedriver_linux64.zip
  # mv chromedriver /usr/local/bin
  # mv selenium-server-standalone-2.44.0.jar /usr/local/bin
  # echo 'done!'
  # echo '----------'

  # set up xvfb display for chrome client
  # export DISPLAY=:10
  # cd /vagrant
  # echo "Starting Xvfb ..."
  # Xvfb :10 -screen 0 1366x768x24 -ac &
  # echo "Starting Google Chrome ..."
  # google-chrome --remote-debugging-port=9222 &
  # echo "Starting Selenium ..."
  # cd /usr/local/bin
  # java -jar selenium-server-standalone-2.44.0.jar

  # make local .meteor directory
   # echo 'creating local .meteor directory'
   # echo '----------'
   # mkdir -p /home/vagrant/nus_oracle/.meteor/local
   # echo 'done!'
   # echo '----------'

  # link local from guest to host directory when running 'meteor'
    # echo 'Linking from guest to host directory'
    # echo '----------'
    # echo "sudo mount --bind /home/vagrant/nus_oracle/.meteor/local/ /vagrant/.meteor/local/" >> /home/vagrant/.bashrc
    # echo 'done!'
    # echo '----------'
fi
