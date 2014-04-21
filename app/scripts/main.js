
(function( SizerSoze, win ){
  var doc = win.document;
  var sizerSoze = new SizerSoze();

  var urlInput = doc.querySelector( "input[name=url]" );
  var requestBtn = doc.querySelector( "#requestresults" );
  var newBp = doc.querySelector( ".add-bp" );
  var rmBp = doc.querySelectorAll( ".icon-remove" );
  var results = doc.querySelectorAll( ".sizer-results" );

  var bpFieldsAreValid = function() {
    var amountInputs = doc.querySelectorAll( "input[name=amount]" );
    var re = /^[0-9]+(\.\d+)?$/;
    for( var i = 0; i < amountInputs.length; i++ ) {
      var field = amountInputs[i];
      if( !re.test(field.value) ) {
        field.focus();
        alert(field.value + " is not a valid breakpoint");
        return false;
      }
    }
    return true;
  };

  requestBtn.addEventListener( "click", function(e) {
    if ( !urlInput.value ) {
      alert("Please enter a URL");
      urlInput.focus();
    } else if( urlInput.value && bpFieldsAreValid() ) {
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
    if ( e.which === 13 && !urlInput.value ) {
      alert("Please enter a URL");
      urlInput.focus();
    } else if( e.which === 13 && urlInput.value && bpFieldsAreValid() ) {
      sizerSoze.sizerTime({
        loading: "images/ajax-loader.gif"
      });
    }
  });


}( SizerSoze, this ));
