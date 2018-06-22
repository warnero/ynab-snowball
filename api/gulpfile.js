const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');

gulp.task('build', () =>

    gulp.src([
        'app.js',
        'account_populate.js',
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

gulp.task('test:unit', () =>
    gulp.src('tests/specs/**/*.spec.js', {read: false})
        .pipe(mocha({
            compilers: 'js:babel-core/register',
            reporter: 'tap'
        }))
);

gulp.task('copy', () =>
    gulp.src(['config/**/*.json'], {base:'.'})
        .pipe(gulp.dest('dist'))
);

gulp.task('default', ['build', 'copy']);