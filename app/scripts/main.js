
(function( SizerSoze, win ){
  var doc = win.document;
  var sizerSoze = new SizerSoze();

  var urlInput = doc.querySelector( "input[name=url]" ),
      newBP = doc.querySelector(".new button");

  urlInput.addEventListener( "keyup" , function( e ){
    if( e.which === 13 ) {
      sizerSoze.sizerTime({
        loading: "images/ajax-loader.gif"
        // distractionYTVideo: "Of2HU3LGdbo"
      });
    }
  });

  newBP.addEventListener( "click" , function( e ){
    sizerSoze.addBP();
  });

}( SizerSoze, this ));
