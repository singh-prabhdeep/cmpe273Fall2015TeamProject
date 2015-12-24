window.onload = function() {	
	ajaxObj = {
			type : "GET",
			url :  "http://localhost:8080/273_Proj_Server/boot/read_sensors",
			contentType : "application/json",
			error : function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " "
						+ errorThrown);
			},
			success : function(data) {
				console.log(data);
				var options = $('#nodeSelect');
			    $.each(data, function(item, num) {
			        options.append($('<option>', {value:num._id, text:num._id}));
			    });
			    
				var options2 = $('#conn1');
			    $.each(data, function(item, num) {
			        options2.append($('<option>', {value:num._id, text:num._id}));
			    });
			    
				var options3 = $('#conn2');
			    $.each(data, function(item, num) {
			        options3.append($('<option>', {value:num._id, text:num._id}));
			    });
			    
				var options4 = $('#conn3');
			    $.each(data, function(item, num) {
			        options4.append($('<option>', {value:num._id, text:num._id}));
			    });
			    
				var options5 = $('#conn4');
			    $.each(data, function(item, num) {
			        options5.append($('<option>', {value:num._id, text:num._id}));
			    });
			    
				var options6 = $('#clientSelect');
			    $.each(data, function(item, num) {
			        options6.append($('<option>', {value:num._id, text:num._id}));
			    });
			    
				var options7 = $('#nodeToDelete');
			    $.each(data, function(item, num) {
			        options7.append($('<option>', {value:num._id, text:num._id}));
			    });
			    
			},
			complete : function(XMLHttpRequest) {
			},
			dataType : "json"
		};
		$.ajax(ajaxObj);
		
					
			
		
    $(document).on("click", "#saveConnections", function(event) {
		event.preventDefault();
		var jsObj = {};
		var str = '';
		//"urn:esn:Clyyy781hj/o+client2/o,client3/o,client4/o,client5/o"
		str += $('#nodeSelect option:selected').text() + "/o+" + $('#conn1 option:selected').text() + "/o," + $('#conn2 option:selected').text() + "/o," + $('#conn3 option:selected').text() + "/o," + $('#conn4 option:selected').text() + "/o"; 
		console.log(str);
		jsObj.packagedInfo = str;
		//alert( "GO" );
//		var jsObj = $postFormData.serializeObject()
//		, ajaxObjGetLocations = {};

		console.log(JSON.stringify(jsObj));
		ajaxObjGetLocations = {
				type : "POST",
				url : "http://localhost:8080/273_Proj_Server/boot/Graph",
				contentType : "application/json",
				data: JSON.stringify(jsObj), 
				error : function(jqXHR, textStatus, errorThrown) {
					console.log("Error " + jqXHR.getAllResponseHeaders() + " "
							+ errorThrown);
				},
				success : function(data) {
					console.log(data);
//					for (var i = 0; i < markers.length; i++) {
//						markers[i].setMap(null);
//					}
//					markers = []
//					console.log(data);
//					for(var key in data){
//						var loc = data[key];
//						console.log(parseFloat(loc.latitude));
//						console.log(parseFloat(loc.longitude));
//						var loclat = parseFloat(loc.latitude);
//						var loclong = parseFloat(loc.longitude);
//					   var marker = new MarkerWithLabel({
//					        position: new google.maps.LatLng(loclong, loclat),
//					        map: map,
//					        visible: true,
//					        title: loc.count,
//					        draggable: true,
//					        raiseOnDrag: true,
//					        labelContent: loc.count,
//					        labelAnchor: new google.maps.Point(15, 65),
//					        labelClass: "labels", // the CSS class for the label
//					        labelInBackground: false,
//					        icon: pinSymbol('red')
//					    });
//						  markers.push(marker);
//						 }
				},
				complete : function(XMLHttpRequest) {
				},
				dataType : "json"
			};

			$.ajax(ajaxObjGetLocations);
	});
    
    $(document).on("click", "#observeClient", function(event) {
		event.preventDefault();
		//client_id + "/" + object_id + "," + client_id + "," + object_id+","+ min_pressure+ ","+ max_pressure+ ","+ "30"
		var str = '';
		//"urn:esn:Clyyy781hj/o+client2/o,client3/o,client4/o,client5/o"
		str += $('#clientSelect option:selected').text() + "/o," + $('#clientSelect option:selected').text() + ",o," + document.getElementById("minPressure").value + "," + document.getElementById("maxPressure").value + "," + "30";
		console.log(str);
    	
		
	    $.ajax({
    	type : "POST",
        url: "http://localhost:8080/273_Proj_Server/api/events/write_attributes",
        contentType : "text/plain; charset=utf-8",
        data: str, 
		error : function(jqXHR, textStatus, errorThrown) {
			console.log("Error " + jqXHR.getAllResponseHeaders() + " "
					+ errorThrown);
		},
        success: function(data1) {
          alert('Observe Request Sent.');
          console.log(data1);
          //put timeout for 5 secs here
          
          $.ajax({
          type: 'POST',
          url: "http://localhost:8080/273_Proj_Server/api/events/observe",
          contentType : "text/plain; charset=utf-8",
          data: str, //pass data1 to second request
          success: function(data1){
        	  console.log(data1);
          },
		  complete : function(XMLHttpRequest) {
		  },
		  dataType : "text"
          });
      },
	  complete : function(XMLHttpRequest) {
	  },
	  dataType : "text"
    });
		
    });
    
    
    
    
    
    
    $(document).on("click", "#deleteNodeOperation", function(event) {
		event.preventDefault();
		var jsObj = {};
		var str = '';
		//client_id + "/" + object_id + "," + client_id + "," + object_id;
		//"urn:esn:Clyyy781hj/o+client2/o,client3/o,client4/o,client5/o"
		str += $('#nodeToDelete option:selected').text() + "/o," + $('#nodeToDelete option:selected').text() + "," + "o";
		console.log(str);
		//alert( "GO" );
//		var jsObj = $postFormData.serializeObject()
//		, ajaxObjGetLocations = {};

		cancelObserve = {
				type : "POST",
				url : "http://localhost:8080/273_Proj_Server/api/events/cancel_observe",
				contentType : "text/plain; charset=utf-8",
				data: str, 
				error : function(jqXHR, textStatus, errorThrown) {
					console.log("Error " + jqXHR.getAllResponseHeaders() + " "
							+ errorThrown);
				},
				success : function(data) {
					console.log(data);
//					for (var i = 0; i < markers.length; i++) {
//						markers[i].setMap(null);
//					}
//					markers = []
//					console.log(data);
//					for(var key in data){
//						var loc = data[key];
//						console.log(parseFloat(loc.latitude));
//						console.log(parseFloat(loc.longitude));
//						var loclat = parseFloat(loc.latitude);
//						var loclong = parseFloat(loc.longitude);
//					   var marker = new MarkerWithLabel({
//					        position: new google.maps.LatLng(loclong, loclat),
//					        map: map,
//					        visible: true,
//					        title: loc.count,
//					        draggable: true,
//					        raiseOnDrag: true,
//					        labelContent: loc.count,
//					        labelAnchor: new google.maps.Point(15, 65),
//					        labelClass: "labels", // the CSS class for the label
//					        labelInBackground: false,
//					        icon: pinSymbol('red')
//					    });
//						  markers.push(marker);
//						 }
				},
				complete : function(XMLHttpRequest) {
				},
				dataType : "text"
			};

			$.ajax(cancelObserve);
	});
    
    
    
    
    
}

