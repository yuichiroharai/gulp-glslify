// modules for gulp
var path = require('path');
var through2 = require('through2');
var gulpUtil = require('gulp-util');
var PluginError = gulpUtil.PluginError;

// modules for glslify
var glslify = require('glslify');
var glslifyImport = require('glslify-import');
var glslifyHex = require('glslify-hex');

var PLUGIN_NAME = 'gulp-glslify';

function gulpGlslify(options) {

    if (!options) options = {};

    // inline mode
    options.inline = true;

    if (!options.transform) options.transform = [];

    // use glslify-import & glslify-hex as default
    options.transform.unshift(glslifyImport, glslifyHex);

    var stream = through2.obj(function (file, enc, cb) {

        // adjust to target file
        options.basedir = path.dirname(file.history[0]);

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        var _this = this;
        if (file.isBuffer()) {

            glslify.bundle(file.contents.toString(), options, function(error, glsl, files) {
                if (error) {
                    cb(new PluginError(PLUGIN_NAME, error));
                    return;
                } else {
                    file.contents = new Buffer(glsl);
                    _this.push(file);
                    return cb();
                }
            });
        }

    });

    return stream;
}

module.exports = gulpGlslify;