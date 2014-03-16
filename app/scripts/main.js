
(function( SizerSoze, win ){
  var doc = win.document;
  var sizerSoze = new SizerSoze();

  var submit = doc.querySelector( "input[type=submit]" );
    submit.addEventListener( "click" , function( e ){
      sizerSoze.sizerTime({
        loading: "images/ajax-loader.gif"
        // distractionYTVideo: "Of2HU3LGdbo"
      });
  });

}( SizerSoze, this ));
