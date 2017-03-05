var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function () {
    // En esta tarea se declaran todas las tareas que estarán corriendo
    // cuando este funcionando $ gulp watch
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app" // El metodo init recibe como argumento un objeto con las caracteristicas para funcionar
        }
    });

    watch('./app/index.html', function () {
        browserSync.reload(); // Recargar la página cada vez que se guarden cambios en index.html
    });

    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('cssInject'); // A través de cssInject se aplicará el procesamiento de PostCSS
    });
    
    watch('./app/assets/scripts/**/*.js', function() {
       gulp.start('scriptsRefresh') 
    });
});

gulp.task('cssInject', ['styles'], function () { // Se esta pasando como dependencia de la tarea cssInject, la tarea styles, para que aplique todo el procesamiento de PostCSS antes de proceder a inyectar los cambios en el CSS que se esta presentando
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
});