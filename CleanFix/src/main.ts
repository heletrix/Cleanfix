import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
// import '../src/app/css/bootstrap.min.css';
// import "../src/app/js/bootstrap.min.js";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// require('./app/css/bootstrap.min.css');
// require('./app/css/animate.min.css');
// require('./app/css/font-awesome.min.css');
// require('./app/css/style.css');

require('./app/js/bootstrap.min.js');
require('./app/js/parallax.min.js');
require('./app/js/wow.js');

require('./app/js/main.js');


platformBrowserDynamic().bootstrapModule(AppModule);
