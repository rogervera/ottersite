/* Request a GIF from GIPHY API, and append to HTML element*/
function fetchGif() {
	$('#search').text('Get another otter');

	$.ajax(
	{
		// GETS an array of 25 GIF objects that match 
		// the search term "otter" (along with two other, non-important objects)

    	url: "https://api.giphy.com/v1/gifs/search?q="+ "otter"
    		+ "&api_key=242b2536eefb4eb5961d2af4c122acbc",

    	success: function(results){

    		// Select a random number from 0 to 25
    		var randomIndex = Math.floor(Math.random() * 25);

    		// Use that random number to get a random GIF object
        	var gifObject = results.data[randomIndex];

			// Get URL of original unaltered GIF
        	var gifURL = gifObject.images.original.url;

        	// Remove existing element with ID #gif (the first time there is none)
        	$('#gif').remove();

        	// Append new img element (with id #gif)
        	$("#gifSection").append("<img id='gif' src='" + gifURL + "''>");

        	//$("#pic").css( "width", "60%" );
    	} // End of function that we want to be executed 
    	  // when data is succesfully retrieved

	} 	// End of object that was passed into jQuery's ajax() function call

	); 	// End of ajax() function call

} 		// End of definition for the fetchGif() function

