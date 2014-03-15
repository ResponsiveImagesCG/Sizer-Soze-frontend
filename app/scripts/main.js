
(function( SizerSoze, win ){
  var doc = win.document;
  var sizerSoze = new SizerSoze();

  var urlInput = doc.querySelector( "input[name=url]" ),
      newBP = doc.querySelector(".new button"),
      requestBtn = doc.querySelector( "#requestresults" );

  urlInput.addEventListener( "keyup" , function( e ){
    if( e.which === 13 ) {
      sizerSoze.sizerTime({
        loading: "images/ajax-loader.gif"
      });
    }
  });

  newBP.addEventListener( "click" , function( e ){
    sizerSoze.addBP();
  });

  requestBtn.addEventListener( "click", function(e) {
    sizerSoze.sizerTime({
      loading: "images/ajax-loader.gif"
    });
  });

}( SizerSoze, this ));
