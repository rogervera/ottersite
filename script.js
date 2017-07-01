function fetchGif() {
	$('#search').text('Get another otter');
	$.ajax({
    url: "https://api.giphy.com/v1/gifs/search?q="+otterSelect()+"&api_key=242b2536eefb4eb5961d2af4c122acbc",
    success: function(results){
    	var randomIndex = Math.floor(Math.random() * 25);
        var data = results.data[randomIndex];
        var gif = data.images.original.url;
        $('#pic').remove();
        $("#gif").append("<img id='pic' src='" + gif + "''>");
        console.log(results);
        $("#pic").css( "width", "60%" );
    }
});
}

function otterSelect() {
	var randomNum = Math.floor(Math.random() * 5);
	var string = "";
	switch(randomNum) {
		case 0:
			string = "river+otter";
			break;
		case 1:
			string = "river+otters";
			break;
		case 2:
			string = "otter";
			break;
		case 3:
			string = "otters";
			break;
		case 4:
			string = "cute+otter";
			break;
	}
	return string;
}