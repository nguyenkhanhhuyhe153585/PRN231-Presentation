$(document).ready(function() {
	deleteProduct();
});

function deleteProduct() {
	var url_param = new URLSearchParams(window.location.search);
		$.ajax({
		    url: domain + "/api/product/" + url_param.get('id'),
		    type: "DELETE",
		    success: function (response) {
		      console.log(response);
		      window.history.back();
		    },
		    error: function (response) {
		    	console.log(response.status + "-" + response.statusText);
		    }
		});
}