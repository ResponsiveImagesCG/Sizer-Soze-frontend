(function( exports ){

  exports.index = function( req , res ){
    res.render( 'index' );
  };

}(typeof exports === 'object' && exports || this));
