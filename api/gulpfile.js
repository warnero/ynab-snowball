const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () =>

    gulp.src([
        'app.js',
        'models/**/*.js',
        'controllers/**/*.js',
        'services/**/*.js',
        'config/**/*.js'
    ], {base:'.'})
        .pipe(babel({
            "presets": [
                ["env", {
                    "targets": {
                        "node": "current"
                    }
                }]
            ]
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('copy', () =>
    gulp.src(['config/**/*.json'], {base:'.'})
        .pipe(gulp.dest('dist'))
);

gulp.task('default', ['build', 'copy']);