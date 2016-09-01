console.log( 'api example script sourced' );

$( document ).on( 'click', '#searchNow', function(){
  // get title
  var searchTitle = $( '#searchIn' ).val();
  console.log( 'searching for:', searchTitle );
  // assemble search URL
  var searchURL = 'http://www.omdbapi.com/?s=' + searchTitle;
  // make ajax call to OMDB to retrieve JSON
  if(searchTitle === ''){
    console.log('nothing entered');
    alert('Search box empty');
  }else{
  $.ajax({
    url: searchURL,
    dataType: 'JSON',
    success: function( data ){
      // successfully hit API
      console.log( 'successful API hit:', data );
      // show results
      // '.Search' is the array of movie objects returned by OMDB
      showResults( data.Search );
    },
    statusCode: {
      404: function(){
        // uh oh, alert there was an error
        alert( 'error connecting to server' );
      } // end error
    }
  });
}}); // end click on search button

var showResults = function( results ){
  console.log( 'in showResults', results );
  // fields for each result: Year, Title, Poster (image URL)
  // empty output div
  $( '#outputDiv').empty();
  // loop through results and display movies
  for( var i = 0 ; i < results.length; i++ ){
    $( '#outputDiv').append( '<p><b>' + results[ i ].Title + '</b> (' + results[ i ].Year + ')</p>' );
    $( '#outputDiv').append( '<img src="' + results[ i ].Poster + '">' );
  } // end for
} // end showResults
