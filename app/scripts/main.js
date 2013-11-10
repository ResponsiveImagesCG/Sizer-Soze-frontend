
(function( SizerSoze, win ){
  var doc = win.document;
  var sizerSoze = new SizerSoze();

  var urlInput = doc.querySelector( "input[name=url]" );

  urlInput.addEventListener( "keyup" , function( e ){
    if( e.which === 13 ) {
      sizerSoze.sizerTime();
    }
  });

}( SizerSoze, this ));
