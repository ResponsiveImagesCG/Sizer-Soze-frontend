
(function( SizerSoze, win ){
  var doc = win.document;
  var sizerSoze = new SizerSoze();

  var urlInput = doc.querySelector( "input[name=url]" );
  var requestBtn = doc.querySelector( "#requestresults" );

  requestBtn.addEventListener( "click", function(e) {
    sizerSoze.sizerTime({
      loading: "images/ajax-loader.gif"
    });
  });

  urlInput.addEventListener( "keyup" , function( e ){
    if( e.which === 13 ) {
      sizerSoze.sizerTime({
        loading: "images/ajax-loader.gif"
      });
    }
  });

}( SizerSoze, this ));
