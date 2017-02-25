 var gulp = require('gulp'),
     svgSprite = require('gulp-svg-sprite'),
     rename = require('gulp-rename'),
     del = require('del');

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg', // Con esto le eliminamos la extensión .css que presentaba en medio del nombre el archivo de sprites
            render: {
                css: {
                  template: './gulp/templates/sprite.css' // Template for storing the css styles for make of the grouped sprites
                }
            }
            
        }
    }
}

gulp.task('beginClean', function() {
    return del(['./app/temp/sprite', './app/assets/images/sprites']); // Tarea de borrado para iniciar el programa sin contenido antiguo.
});

gulp.task('createSprite', ['beginClean'], function() {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites/'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/**/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules/'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
    return del('./app/temp/sprite'); // Tarea de borrado para eliminiar los archivos temporales generados para la creación de los sprites
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);