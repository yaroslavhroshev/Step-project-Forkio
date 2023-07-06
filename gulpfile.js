import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import clean from 'gulp-clean';
import ghPages from 'gulp-gh-pages';
import browserSync from 'browser-sync';
const bs = browserSync.create();

gulp.task('deploy', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

const scss = () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
}

const css = () => {
    return gulp.src('./dist/css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))
}

const imgmin = () => {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}

const js = () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(gulp.dest('./dist/js'))
}

const cleanDist = () => {
    return gulp.src('./dist', { read: false })
        .pipe(clean())
}

const cleanCss = () => {
    return gulp.src('./dist/css/*.css', { read: false })
        .pipe(clean())
}

const cleanJS = () => {
    return gulp.src('./dist/js/*.js', { read: false })
        .pipe(clean())
}

const dev = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*.scss', gulp.series(cleanCss, scss, css, (next) => {
        browserSync.reload()
        next()
    }))
    gulp.watch('./src/js/**/*.js', gulp.series(cleanJS, js, (next) => {
        browserSync.reload()
        next()
    }))
    gulp.watch('./*.html', (next) => {
        browserSync.reload()
        next()
    })
}

gulp.task('build', gulp.series(cleanDist, gulp.parallel(gulp.series(scss, css), js, imgmin)))
gulp.task('dev', gulp.series('build', dev))