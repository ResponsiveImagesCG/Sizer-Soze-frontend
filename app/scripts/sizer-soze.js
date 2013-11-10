(function( win, undefined ){
  var doc = win.document;

  if( !("querySelectorAll" in doc ) ){
    return;
  }
  // http://api.sizersoze.org/api/?viewport=680,1260&target_url=blog.cloudfour.com&ignore_invisibles=0
  var objToQueryStr = function( obj ){
    var query;

    var params = [], p = "";
    for( var i in obj ){
      p += i;
      p += "=";
      p += obj[i];
      params.push( p );
      p = "";
    }
    query = params.join( "&" );
    return query;
  };

  var makeRequest = function( url, data, callback ){
    var req = new XMLHttpRequest();
    var reqUrl = url + "/?" + objToQueryStr( data );
    req.open( "get", reqUrl, true );
    req.onload = function() {
      callback( null, this.responseText );
    };

    req.onerror = function(){
      callback( "ERROR: Request", this.responseText );
    };

    req.send();
  };


  var createTable = function( arr ){
    var table = document.createElement( "table" ),
      tbody = document.createElement( "tbody" ),
      thead = document.createElement( "thead" ),
      tr, td, summary, summary2, results;

    results = document.querySelectorAll( ".sizer-results" );

    //HEAD
    summary2 = arr[0].summary;
    tr = document.createElement( "tr" );
    for( var k in summary2 ){
      td = document.createElement( "td" );
      td.innerHTML = k;
      tr.appendChild( td );
    }
    thead.appendChild( tr );
    table.appendChild( thead );

    //BODY
    for( var i = 0, l = arr.length; i < l; i++ ){
      tr = document.createElement( "tr" );
      summary = arr[i].summary;
      for( var j in summary ){
        console.log( j );
        td = document.createElement( "td" );
        td.innerHTML = summary[j];
        tr.appendChild( td );
      }
      tbody.appendChild( tr );
    }
    table.appendChild( tbody );
    for( var m = 0, ml = results.length; m < ml; m++ ){
      results[m].appendChild( table );
    }
  };

  var processData = function( err, data ){
    if( err ){
      console.log( err );
      return;
    }

    try {
      var arr = JSON.parse( data );
      createTable( arr );
    } catch (e){
      throw new Error( e );
    }

  };


  var SizerSoze = function(){
    this.apiURL = "http://api.sizersoze.org/api";
  };

  SizerSoze.prototype.gatherData = function(){
    var data = {};
    var urlInput = doc.querySelector( "input[name=url]" );
    var breakpoints = doc.querySelectorAll( ".breakpoint" );
    var bps = [];

    for( var i = 0, l = breakpoints.length; i < l; i++ ){
      var bp = breakpoints[i];
      var input = bp.querySelector( "input" );
      if( input != null ){
        bps.push( input.value );
      }
    }

    data.viewports = bps.join(',');
    data.target_url = urlInput.value;
    data.ignore_invisibles = 0;

    return data;
  };

  SizerSoze.prototype.sizerTime = function(){
    var data = this.gatherData();
    makeRequest( this.apiURL, data, processData );
  };

  win.SizerSoze = SizerSoze;

}( this ));
