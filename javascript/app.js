$(document).ready(function (){
	let $searchBox = $("#search-box");
	
		
	$("#btn-search").on("click", function(){
		// flickr JSON photo Api
		let url = `https://api.flickr.com/services/feeds/photos_public.gne?
					tags=${$searchBox.val()}&format=json&jsoncallback=?`;

		let prevSearchTerm;
		// assign entered search term to a new variable
		let newSearchTerm = $searchBox.val();
		let index = 0;
				
				// If user enters a new search term
				if(prevSearchTerm !== newSearchTerm){
					// set <div class="photo"> to empty
					$("main .photo").empty();
					// fetch JSON data from flickr api
					$.getJSON(url, (flickrResponse) => {
						//create and append images
						displayImages(flickrResponse, index);
						
					});
				}
				
				// assign previous search term to the variable prevSearchTerm
				prevSearchTerm = $searchBox.val();
				//console.log("second search term: "+ searchTerm);

	});
	


})

displayImages = (flickrResponse, index) => {
		// exit function once it gets to the end of the photo array
		if(flickrResponse.items.length-1 === index)return false;
		 
		// create an image and hide it
		let $img = $("<img>").hide();
		// set src attribute to JSON's "m" property's value
		$img.attr('src', flickrResponse.items[index].media.m);
		$("main .photo").append($img);
		$img.fadeIn();

		// create and append a new image every second
		setTimeout(() => {
				index = index + 1;
				displayImages(flickrResponse, index)
								
				}, 1000)
			

}