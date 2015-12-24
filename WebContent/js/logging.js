window.onload = function() {
	ajaxObj = {
		type : "GET",
		url :  "http://localhost:8080/273_Proj_Server/boot/read_alerts",
		contentType : "application/json",
		error : function(jqXHR, textStatus, errorThrown) {
			console.log("Error " + jqXHR.getAllResponseHeaders() + " "
					+ errorThrown);
		},
		success : function(data) {
			console.log(data);
			var dataBody = document.createElement('TBODY');
			var dataTable = document.getElementById('category_table');
			var ht = "<tbody>";
			
//			$('#category_table').bootstrapTable({
//			    data: data
//			});
		
//			$('#category_table').dataTable({
//				
//			});
			data.forEach(function (element, index) {
				//[ { "_id" : { "$oid" : "56661d52f101bc3d44907ebf"} , "id" : "Clyyy7991hj/o" , "pressure_value" : 120 , "pressure_status" : "100" , "connected_node" : "Clyyy7993hj/o" , "time" : "2015/12/07 15:59:14"}]
				console.log(element._id);
				ht = ht + "<tr><td>" + (element.id) + "</td><td>" + (element.pressure_value) + "</td><td>" + (element.pressure_status) + "</td><td>" + (element.connected_node) + "</td><td>" + element.time +"</td></tr>";
				//ht = ht + "<tr><td>" + (element._id) + "</td></tr>";
				//console.log(index + “:” + element);
				});
//			for (var keys in data ){
//				//var obj = keys;
//				console.log(keys);
//				ht = ht + "<tr><td>" + (keys._id) + "</td></tr>";
//			}
			ht = ht + "</tbody>";
			$("#category_table").html(ht);
			
		},
		complete : function(XMLHttpRequest) {
		},
		dataType : "json"
	};
	$.ajax(ajaxObj);

}