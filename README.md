# gulp-glslify
gulp plugin for glslify https://github.com/stackgl/glslify


## Install
```sh
npm install -D https://github.com/yuichiroharai/gulp-glslify.git
```

## Usage
```js
var gulp = require("gulp");
var glslify = require("gulp-glslify");

gulp.task("glslify", null, function() {
    gulp.src("./src/**/*.{vert,frag,glsl}")
      .pipe(glslify())
      .pipe(gulp.dest("./dest/"));
});
```