(function(exports) {

  var express = require( 'express' ),
    routes = require( './routes' ),
    port, app;


  app = express();
  app.use( express.logger() );
  app.use( express.compress() );
  app.use( express.bodyParser() );
  app.use( '/styles' , express.static( __dirname + '/app/styles' ) );
  app.use( '/scripts' , express.static( __dirname + '/app/scripts' ) );
  app.use( '/images' , express.static( __dirname + '/app/images' ) );
  app.engine('.html', require('ejs').__express);

  // Optional since express defaults to CWD/views

  app.set('views', __dirname + '/views');

  // Without this you would need to
  // supply the extension to res.render()
  // ex: res.render('users.html').
  app.set('view engine', 'html');

  app.get( '/' , routes.index );

  port = process.env.PORT || 3000;

  app.listen(port, function() {
    console.log("Listening on " + port);
  });

}(typeof exports === 'object' && exports || this));

