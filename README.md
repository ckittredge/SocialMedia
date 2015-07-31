# The Social Network
The Social Network

Chris Kittredge

Chris.Kittredge87@gmail.com

Heroku Hosted:

http://kittredge-social-media.herokuapp.com

Steps for getting The Social Network running locally

1. Make sure that nodejs is installed on your machine
 - The most current version of node js can be found here: https://nodejs.org/download/
 - This will be needed to run the local server and install any necessary packages through npm
 
2. Within terminal or command prompt, navigate to the root of the project folder and issue the following commands:
    - npm install
    - npm start
    
3. The server should now be up and running, serving the main page up to http://127.0.0.1:3000


Running Unit Tests

    Unit test specs are written using the Jasmine framework and can be run using the Karma test runner
    
1. Using node package manager, open terminal or command prompt and issue the following commands:
    - npm install -g karma --save-dev
    - npm install -g karma-jasmine --save-dev
    - npm install -g karma-phantomjs-launcher --save-dev
    - npm install -g karma-cli --save-dev (windows only)
    
2. Navigate to the test folder within the root of the project within terminal or command prompt

3. After making sure that 'karma' is part of your PATH, issue the following command:
    - karma start karma.conf.js
    
4. Tests will now run whenever a change is made to any code that is being watched with the karma config file

Gruntfile

1. The grunfile included provides configuration to enable safe annotation and minification of the javascript and angular modules