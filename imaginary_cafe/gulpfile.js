var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
  }),
  browserSync = require('browser-sync');
  del = require('del');
  runSequence = require('run-sequence');
  fileinclude = require('gulp-file-include');

// path
var basePath = {
  app: 'app/',
  dist: 'dev/'
};
var path = {
  'app' : {
    'html'   : basePath.app + 'html/',
    'sass'   : basePath.app + 'sass/',
    'js'     : basePath.app + 'js/',
    'sprites' : basePath.app + 'sprites/',
  },
  'dist' : {
    'html' : basePath.dist + '**/*.html',
    'image' : basePath.dist + 'assets/images/',
    'css' : basePath.dist + 'scss/',
    'js'  : basePath.dist + 'js/',
    'modules' : basePath.dist + '_modules/'
  }
}

var AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  'ie >= 8'
];

// Browser Sync
gulp.task('bs', function(){
  browserSync.init(null, {
    server: {
      baseDir: basePath.dist,
      directory: true
    },
    notify: false,
    xip: false
  });
});

// sass
gulp.task('sass', function () {
  gulp.src('dev/scss/style.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dev/css/'))
    .pipe(browserSync.reload({
      stream : true
    }));
});

// image
gulp.task('images', function () {
  gulp.src(path.dist.image + '**/*')
    .pipe($.image())
    .pipe(gulp.dest(path.dist.image))
    .pipe($.size());
});

// sprite
gulp.task('sprites', function(){
  var spriteData = gulp.src(path.app.sprites + '**/*.png')
    .pipe($.spritesmith({
      imgName: 'sprites.png',
      cssName: 'sprites.scss',
      cssFormat: 'sass',
      cssTemplate: path.app.sprites + 'template.mustache',
      imgPath: '../images/modules/sprites.png',
      algorithm: 'binary-tree',
      padding: 4
    }));

  spriteData.img
    .pipe(gulp.dest(path.dist.image + 'modules/'))

  spriteData.css
    .pipe(gulp.dest(path.app.sass));
});

// js
gulp.task('js', function() {
  gulp.src( [
    path.app.js + 'libs/device.js',
    path.app.js + 'common.js'
    ] )
    .pipe($.concat('common.js'))
    .pipe(gulp.dest(path.dist.js))
});
gulp.task('jsmin', function() {
  gulp.src(path.dist.js + 'common.js')
    .pipe($.uglify())
    .pipe(gulp.dest(path.dist.js))
});

// html
gulp.task('html', function() {
  gulp.src([path.app.html+'**/!(_)*.html'])
    .pipe($.cached())
    .pipe($.using())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest(basePath.dist));
});
gulp.task('all', function() {
  gulp.src([path.app.html+'**/!(_)*.html'])
    .pipe($.using())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest(basePath.dist));
});
gulp.task('del', function(cb) {
  del([basePath.dist + '!(_)**/*.html', basePath.dist + '*.html'], cb);
});
gulp.task('build', function() {
  runSequence(
    'del',
    'all'
  );
});

//watch
gulp.task('watch', function(){
  gulp.watch([
    path.dist.html,
    'dev/assets/images/**/*',
    'dev/css/styles.css',
    'dev/js/my-script.js'
    ], browserSync.reload);
  gulp.watch([path.app.js + 'common.js'], ['js']);
  gulp.watch(['dev/scss/**/*.scss', 'dev/scss/**/*.sass'], ['sass']);
  gulp.watch([path.app.sprites + '**/*.png'], ['sprites']);
  gulp.watch([path.app.html + '**/!(_)*.html'], ['html']);
  gulp.watch([path.app.html + '_includes/*.html'], ['all']);
});

gulp.task('default', ['watch', 'bs']);
