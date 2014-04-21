
(function( SizerSoze, win ){
  var doc = win.document;
  var sizerSoze = new SizerSoze();

  var urlInput = doc.querySelector( "input[name=url]" );
  var requestBtn = doc.querySelector( "#requestresults" );
  var newBp = doc.querySelector( ".add-bp" );
  var rmBp = doc.querySelectorAll( ".icon-remove" );
  var results = doc.querySelectorAll( ".sizer-results" );

  requestBtn.addEventListener( "click", function(e) {
    if( urlInput.value ) {
      sizerSoze.sizerTime({
        loading: "images/ajax-loader.gif"
      });
    }
  });

  newBp.addEventListener( "click", sizerSoze.addBP );

  document.addEventListener( "click", function( e ){
    var el = e.target;

    if( el && el.getAttribute( "class" ) && el.getAttribute( "class" ).indexOf( "icon-remove" ) > -1 ){
      sizerSoze.removeBP( el );
    }
    e.preventDefault();
  });

  urlInput.addEventListener( "keyup" , function( e ){
    if( e.which === 13 ) {
      sizerSoze.sizerTime({
        loading: "images/ajax-loader.gif"
      });
    }
  });


}( SizerSoze, this ));
