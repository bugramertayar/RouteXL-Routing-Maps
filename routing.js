function RouteXL_API_Connector() {
	
	this.tour = function(locations, success_callback, error_callback) {
		
		let request = jQuery.ajax({

			beforeSend: function (xhr) {
			    xhr.setRequestHeader ("Authorization", "Basic " + btoa("<id:password>"));
			},

			url: "https://api.routexl.nl/tour",
			method: "POST",
            dataType: "json",
			data: { locations: locations},
						
		});
		
		request.done(function( msg ) {
			success_callback(msg);
		});
			 
		request.fail(function( jqXHR, textStatus ) {
			error_callback(textStatus);
		});
		
	};
	
}
let locations=[ {"address":"first","lat":"41.074209","lng":"29.032806"}, //starting location
                {"address":"second","lat":"41.081584","lng":"29.026729"},
                {"address":"third","lat":"41.113235","lng":"29.039996"},
                {"address":"fourth","lat":"41.178246","lng":"28.892871"},
            	{"address":"fifth","lat":"41.154276","lng":"28.914775"},
				{"address":"sixth","lat":"41.105789","lng":"28.991436"}/// ending location 
				 
            // {"address":"seventh","lat":"41.065763","lng":"29.007646"}/// TOLLS
			   // {"address":"sixth","lat":"41.021274","lng":"29.010392"}/// TOLLS
			   
];


let r = new RouteXL_API_Connector();
			
			// Get the tour
			r.tour( locations , function(result) {// Success
				
				
				let sortedArray=[];
			

				 for(let a=0;a<locations.length;a++){
					 for(let i=0;i<locations.length;i++){
						 if(locations[i].address===result.route[a].name){
								sortedArray.push(locations[i]);
						 }
					 }
				 }

				 console.log(sortedArray);

				 
              
          
				let addedLink="";
				 for(let q=0;q<sortedArray.length;q++){
					addedLink+=`'${sortedArray[q].lat},${sortedArray[q].lng}'/`;
					
				 }


				 let showFirstOnMap=`@${sortedArray[0].lat},${sortedArray[0].lng},`;
				 let defaultZoomMap="12z/";

				
				
				
		
				const link=document.getElementById("link");
				link.href="https://www.google.com/maps/dir/" + addedLink + showFirstOnMap + defaultZoomMap + "data=!4m11!4m10!1m3!2m2!1d29.026729!2d41.081584!1m0!1m3!2m2!1d29.039996!2d41.113235!3e0`";//DEFAULT
				//AVOID TOLLS-->//link.href="https://www.google.com/maps/dir/" + addedLink + showFirstOnMap + defaultZoomMap + "data=!3m1!4b1!4m28!4m27!1m3!2m2!1d29.032806!2d41.074209!1m3!2m2!1d29.026729!2d41.081584!1m3!2m2!1d29.039996!2d41.113235!1m3!2m2!1d28.914775!2d41.154276!1m3!2m2!1d28.892871!2d41.178246!1m3!2m2!1d28.991436!2d41.105789!2m1!2b1!3e0";  
				//AVOID HIGHWAYS -->//link.href="https://www.google.com/maps/dir/" + addedLink + showFirstOnMap + defaultZoomMap + "data=!3m1!4b1!4m28!4m27!1m3!2m2!1d29.032806!2d41.074209!1m3!2m2!1d29.026729!2d41.081584!1m3!2m2!1d29.039996!2d41.113235!1m3!2m2!1d28.892871!2d41.178246!1m3!2m2!1d29.007646!2d41.065763!1m3!2m2!1d29.010392!2d41.021274!2m1!1b1!3e0";  
				//AVOID HIGHWAYS AND TOLLS -->//link.href="https://www.google.com/maps/dir/" + addedLink + showFirstOnMap + defaultZoomMap + "data=!3m1!4b1!4m29!4m28!1m3!2m2!1d29.032806!2d41.074209!1m3!2m2!1d29.026729!2d41.081584!1m3!2m2!1d29.039996!2d41.113235!1m3!2m2!1d28.892871!2d41.178246!1m3!2m2!1d29.007646!2d41.065763!1m3!2m2!1d29.010392!2d41.021274!2m2!1b1!2b1!3e0";  
				
				 

			}, function(error) {// Error
				
				console.log( error );
				
});


