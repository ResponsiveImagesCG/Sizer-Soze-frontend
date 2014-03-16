var request = require( "request" ),
  qs = require( "querystring" ),
  // hard-coded for now, could come from stdin or ???
  params = {
    viewport: [ "680", "1260" ],
    target_url: "blog.cloudfour.com",
    ignore_invisibles: 0,
    postback_url: "bla.bla.com"
  },
  req_url = "";

params.viewport = params.viewport.join( "," );
req_url = "http://api.sizersoze.org/api/?" + qs.stringify( params );

request( req_url, function( err, res, body ) {
  console.log( res.statusCode + ": " + res.body );
  if ( err ) {
    console.dir( err );
    return;
  }
  if ( res.statusCode == 200 ) {
    console.dir( body );
  }
});
