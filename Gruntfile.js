module.exports = function (grunt) {
    grunt.initConfig({  
        ngAnnotate: {  
            options: {
                singleQuotes: true,
                compress: true
           },
            vendor: {
                files: {
                   'public/annotated/annotated_vendor.js': [
                    'public/javascripts/jquery.js',   
                    'public/bootstrap/dist/js/bootstrap.js',    
                    'public/javascripts/angular/angular.js',
                    'public/javascripts/underscore.js',
                    'public/javascripts/angular-ui-router.min.js'
                   ]
                }
            }, 
            app: {
                files: {
                   'public/annotated/annotated_app.js': [
                    'public/app/util/underscore.mod.js',
                    'public/app/newsFeed/newsFeed.mod.js',
                    'public/app/sideMenu/sideMenu.mod.js',
                    'public/app/widgets/widgets.mod.js',
                    'public/app/users/appUsers.mod.js',
                    'public/app/main.js',
                    'public/app/newsFeed/**/*.js',
                    'public/app/sideMenu/**/*.js',
                    'public/app/widgets/**/*.js',
                    'public/app/users/**/*.js'
                   ]
                }
            } 
          },
          uglify: {  
            options: {
                compress: true
           },
            vendor: {
                files: {
                   'public/dist/vendor.min.js': [
                        'public/javascripts/jquery.js',   
                        'public/bootstrap/dist/js/bootstrap.js',    
                        'public/javascripts/angular/angular.js',
                        'public/javascripts/underscore.js',
                        'public/javascripts/angular-ui-router.min.js'
                   ]
                }
            }, 
            app: {
                files: {
                   'public/dist/app.min.js': [
                       'public/annotated/annotated_app.js'
                   ]
                }
            } 
          }  
    });  
    
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // Default task.  
    grunt.registerTask('default', ['ngAnnotate', 'uglify']);  
};