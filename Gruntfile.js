var async, child_process, fs, mkdirp, path, request, rimraf;

child_process = require('child_process');
async = require('async');
fs = require('fs');
mkdirp = require('mkdirp');
request = require('request');
rimraf = require('rimraf');
path = require('path');

module.exports = function(grunt) {
  var runWintersmith;
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wintersmith: {
      build: {
        options: {
          config: './config-production.json'
        }
      },
      preview: {
        options: {
          action: 'preview'
        }
      }
    }
  });
  grunt.registerTask('clean', 'Delete the downloaded files, and the build site', function() {
    rimraf.sync('build');
    rimraf.sync(path.join(__dirname, 'contents', 'extra_dependencies'));
    return rimraf.sync(path.join(__dirname, 'contents', 'bower_components'));
  });
  grunt.registerTask('get', 'Downlaod the dependencies', function() {
    var done,
      _this = this;
    done = this.async();
    return async.parallel([
      function(callback) {
        var bowerJson;
        bowerJson = JSON.parse(fs.readFileSync('bower.json', 'utf8'));
        return async.each(bowerJson.extraDependencies, (function(dependency, callback) {
          var destDir;
          destDir = path.join(__dirname, 'contents', 'extra_dependencies', dependency.name);
          if (dependency.files != null) {
            return (function() {
              mkdirp.sync(destDir);
              return async.each(dependency.files, (function(file, callback) {
                var message;
                message = "" + dependency.name + ": " + file.filename;
                return request(file.remote, function(err, res, body) {
                  if (res.statusCode >= 400) {
                    err = new Error(("Failed to download " + file.filename + ", with ") + ("" + response.statusCode + ". URL: " + file.remote));
                  }
                  if (err) {
                    if (err) {
                      return callback(err);
                    }
                  }
                  grunt.log.writeln("" + message + " ok");
                  fs.writeFileSync(path.join(destDir, file.filename), body, 'utf8');
                  return callback(null);
                });
              }), function(err) {
                if (err) {
                  return callback(err);
                }
                return callback(null);
              });
            })();
          } else if (dependency.repo != null) {
            return (function() {
              var git, onData;
              console.log("Deleting " + destDir);
              rimraf.sync(destDir);
              git = child_process.spawn('git', ['clone', dependency.repo.url, destDir]);
              onData = function(data) {
                return console.log(data.toString('utf8').trim());
              };
              git.stdout.on('data', onData);
              git.stderr.on('data', onData);
              return git.on('close', function(code) {
                if (code) {
                  return callback(new Error('Weird error'));
                }
                rimraf.sync(path.join(destDir, '.git'));
                return callback(null);
              });
            })();
          }
          return callback(null);
        }), function(err) {
          if (err) {
            callback(err);
          }
          return callback(null);
        });
      }, function(callback) {
        var bower, onData;
        bower = child_process.spawn('./node_modules/bower/bin/bower', ['install']);
        onData = function(data) {
          return console.log(data.toString('utf8').trim());
        };
        bower.stdout.on('data', onData);
        bower.stdout.on('data', onData);
        return bower.on('close', function(code) {
          if (code) {
            return callback(new Error('Weird error'));
          }
          return callback(null);
        });
      }
    ], function(err) {
      if (err) {
        throw err;
      }
      return done();
    });
  });
  runWintersmith = function(args, done) {
    var onData, whichWintersmith, wintersmith;
    whichWintersmith = './node_modules/wintersmith/bin/wintersmith';
    wintersmith = child_process.spawn(whichWintersmith, args);
    onData = function(data) {
      return console.log(data.toString('utf8').trim());
    };
    wintersmith.stdout.on('data', onData);
    wintersmith.stderr.on('data', onData);
    return wintersmith.on('close', function(code) {
      if (code) {
        throw new Error('Something went wrong');
      }
      return done();
    });
  };
  grunt.registerTask('preview', 'Preview the site', function() {
    var done;
    done = this.async();
    return runWintersmith(['preview'], done);
  });
  return grunt.registerTask('default', 'Build the entire site', function() {
    var done;
    done = this.async();
    return runWintersmith(['build', '--config', './config-production.json'], done);
  });
};