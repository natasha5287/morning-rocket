import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import htmlmin from 'gulp-htmlmin';
import del from 'del';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import browser from 'browser-sync';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import webpack from 'webpack-stream';

// Styles
const styles = () => {
    return gulp.src('source/sass/style.scss', { sourcemaps: true })
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(),
            csso()
        ]))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css', { sourcemaps: '.' }))
        .pipe(browser.stream());
}

// Html
const html = () => {
    return gulp.src('source/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
}

// Fonts 
const ttfToWoff = () => {
    return gulp.src('source/fonts/*.ttf')
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(gulp.src('source/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(gulp.dest('dist/fonts/'))
}

// Scripts
const scripts = () => {
    return gulp.src('source/scripts/main.js')
        .pipe(webpack({
            mode: 'development',
        }))
        .pipe(terser())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browser.stream());
}

// Images
const optimizeImages = () => {
    return gulp.src('source/img/**/*.{png,jpg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
}

const copyImages = () => {
    return gulp.src('source/img/**/*.{png,jpg}')
        .pipe(gulp.dest('dist/img'))
}

// WebP

const createWebp = () => {
    return gulp.src(['source/img/**/*.{png,jpg}', '!source/img/favicons/*.{png,jpg}', '!source/img/background/*.{png,jpg}'])
        // .pipe(squoosh({
        //     webp: {}
        // }))
        .pipe(webp())
        .pipe(gulp.dest('dist/img'))
}

// SVG
const svg = () => {
    return gulp.src(['source/img/*.svg', '!source/img/sprite/*.svg'])
        .pipe(svgo())
        .pipe(gulp.dest('dist/img'))
}

const sprite = () => {
    return gulp.src('source/img/sprite/*.svg')
        .pipe(svgo())
        .pipe(svgstore({
            imlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('dist/img'))
        .pipe(browser.stream());
}

// Copy

export const copy = (done) => {
    gulp.src([
        'source/img/favicons/*.{svg,png}',
        'source/img/favicons/*.webmanifest',
        'source/img/*.mp4',
        'source/fonts/*.{woff,woff2}'
    ], {
        base: 'source'
    })
        .pipe(gulp.dest('dist'))
    done();
}

// Clean
export const clean = () => {
    return del('dist');
}

// Server
const server = (done) => {
    browser.init({
        server: {
            baseDir: 'dist'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

// Reload
const reload = (done) => {
    browser.reload();
    done();
}

// Watcher
const watcher = () => {
    gulp.watch('source/sass/**/*.scss', styles);
    gulp.watch('source/scripts/**/*.js', scripts);
    gulp.watch(['source/img/**/*.*', '!source/img/sprite/*.svg'], gulp.series(copyImages, createWebp, svg));
    gulp.watch('source/img/sprite/*.svg', gulp.series(sprite));
    gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build
export const build = gulp.series(
    clean,
    copy,
    optimizeImages,
    gulp.parallel(
        styles,
        html,
        ttfToWoff,
        scripts,
        svg,
        sprite,
        createWebp
    ),
)

// Default
export default gulp.series(
    clean,
    copy,
    copyImages,
    gulp.parallel(
        styles,
        html,
        ttfToWoff,
        scripts,
        svg,
        sprite,
        createWebp
    ),
    gulp.series(
        server,
        watcher
    )
)