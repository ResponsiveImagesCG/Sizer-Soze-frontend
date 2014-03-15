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

  var bytesToSize = function( bytes ) {
    var sizes = ["Bytes", "KB", "MB"],
        i,
        isPositive = (bytes > 0) ? 1 : -1;
    if (bytes === 0) return "0 Bytes";

    i = parseInt(Math.floor(Math.log(bytes * isPositive) / Math.log(1024)), 10);
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];


  };
  var createTable = function( arr ){
    var table = document.createElement( "table" ),
      tbody = document.createElement( "tbody" ),
      thead = document.createElement( "thead" ),
      header = document.createElement("h1"),
      conclusion = document.createElement('p'),
      headers = {
        "viewport": "Breakpoint",
        "image_data": "Original Weight",
        "lossless": "Lossless Savings",
        "lossy": "Lossy Savings",
        "resize": "Resized Savings"
      },
      tr, td, th, summary, summary2, results;

    results = document.querySelectorAll( ".sizer-results" );

    console.log( results );
    results[ 0 ].innerHTML = "";

    //HEAD
    summary2 = arr[0].summary;
    header.innerHTML = "Results for " + summary2["url"];
    tr = document.createElement( "tr" );
    for( var k in headers ){
      th = document.createElement( "th" );
      th.innerHTML = headers[k];
      tr.appendChild( th );
    }
    //Let's show a percentage here too
    th = document.createElement( "th" );
    th.innerHTML = "% Savings";
    tr.appendChild( th );

    thead.appendChild( tr );
    table.appendChild( thead );

    //BODY
    for( var i = 0, l = arr.length; i < l; i++ ){
      tr = document.createElement( "tr" );
      summary = arr[i].summary;
      for( var j in headers ){
        td = document.createElement( "td" );
        td.innerHTML = (j === 'viewport') ? summary[j] : bytesToSize(summary[j]);
        tr.appendChild( td );
      }
      //Let's show a percentage here too
      td = document.createElement( "td" );
      if (summary["image_data"] !== 0 && summary["resize"] !== 0) {
        td.innerHTML = Math.floor(( summary["resize"] / summary["image_data"] ) * 100) + "%";
      } else {
        td.innerHTML = "0%";
      }
      tr.appendChild( td );

      tbody.appendChild( tr );
    }
    table.appendChild( tbody );
    for( var m = 0, ml = results.length; m < ml; m++ ){
      var r = results[m];
      var iframe = r.querySelector( "iframe" );
      if( iframe ){
        r.removeChild( iframe );
      }
      r.appendChild( header );
      r.appendChild( table );
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
    var i = 0;
    var bpLength = breakpoints.length;

    for (; i < bpLength; i++) {
      var valueType;
      var bpValue;
      var bp = breakpoints[i];
      var input = bp.querySelector( "input" );

      try {
        valueType = bp.querySelector("select").value;
        bpValue = input.value;

        if (valueType == "em") {
          var unitConversion = 16; // Assuming 1em = 16px

          bpValue = input.value * unitConversion; // Convert to px
        }

        if( input !== null && bpValue !== null){
          bps.push( bpValue );
          console.log(bps);
        }
      } catch (e) {
        console.log('Couldn’t find select and input field.');
      }
    }

    data.viewports = bps.join(',');
    data.target_url = urlInput.value;
    data.ignore_invisibles = 0;

    return data;
  };

  SizerSoze.prototype.addBP = function(){
    var bpHTML = doc.querySelector( ".breakpoint" ).outerHTML.replace('860', ''),
        bpContainer = doc.querySelector(".bpcontainer");

    bpContainer.innerHTML += bpHTML;
  };

  SizerSoze.prototype.sizerTime = function( opts ){
    var data = this.gatherData();
    var results = document.querySelector( ".sizer-results.cf" );

    results.innerHTML = "";

    if( opts.distractionYTVideo ) {
      var iframe = document.createElement( "iframe" );
      iframe.width = "560";
      iframe.height = "315";
      iframe.src =  "//www.youtube.com/embed/" + opts.distractionYTVideo + "?autoplay=1";
      iframe.frameborder="0";
      results.appendChild( iframe );
    } else {
      var loading = document.createElement( "img" );
      loading.src = opts.loading;
      loading.alt = "Loading results.";
      loading.setAttribute( "class", "loading" );
      results.appendChild( loading );
    }
    makeRequest( this.apiURL, data, processData );
  };

  win.SizerSoze = SizerSoze;

}( this ));
