$(document).ready(function () {
	loadEditForm();
	editProduct();
});

function editProduct() {
    $("#formEdit").submit(function (event) {
        event.preventDefault();

        let productId = $("#productId").val();
        let productName = $("#productName").val();
        let categoryId = Number($("#selectCategory").val());
        let unitInStock = Number($("#unitInStock").val());
        let unitPrice = Number($("#unitPrice").val());

        let dataRequest = {
        	productId: productId,
            productName: productName,
            categoryId: categoryId,
            unitsInStock: unitInStock,
            unitPrice: unitPrice
        }

        $.ajax({
            url: domain + "/api/product",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(dataRequest),
            complete: function(xhr){
                if(xhr.status == 200){
                    handleSuccess();
                }
                if(xhr.status == 402){
                    handleError(xhr.responseJSON)
                }
            }
        });

        function handleSuccess() {
            window.history.back();
        }

        function handleError(response) {
            Swal.fire({
                icon: 'error',
                title: response.data
            })

            console.log(JSON.stringify(response));
        }
    });
}

function loadEditForm() {
	var url = new URLSearchParams(window.location.search);
    $.ajax({
        url: domain + "/api/product/" + url.get('id'),
        type: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            render(response);
        }
    });

    function render(data) {
    	let pid = `<h2 class="mb-4" id="pid">Edit Product: ${data.productId}</h2>`;
        $("#pid").html(pid);

        let resultRender = "";
        resultRender +=
           `<input type="hidden" id="productId" value="${data.productId}" />
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="productName" class="form-label">Product Name</label>
                    <input type="text" class="form-control" id="productName" value="${data.productName}" required>
                </div>
            </div>
            <div class="row mb-3">
		        <div class="col-md-6">
		            <label class="form-label" for="selectCategory">Category</label>
		            <select id="selectCategory" class="form-select" required>`
		                // <option value="${data.categoryID}" selected>${data.categoryId}</option>
		                $.ajax({
					        url: domain + "/api/category",
					        type: "GET",
					        dataType: "json",
					        success: function (response) {
					            console.log(response);
					            render(response);
					        }
					    });

					    function render(data2) {
					        let result = "";
					        for (let item of data2) {
					        	if (item.categoryID != data.categoryId) {
					        		result +=
					                ` <option value="${item.categoryID}" >${item.categoryName}</option>`
					        	} else {
					        		result +=
					                ` <option value="${item.categoryID}" selected>${item.categoryName}</option>`;
					        	}
					        }
					        $("#selectCategory").append(result);
					    }
		            resultRender += `</select>
		        </div>
		    </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="unitInStock" class="form-label">Unit In Stock</label>
                    <input type="number" class="form-control" id="unitInStock" value="${data.unitsInStock}" min="0" required>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="unitPrice" class="form-label">Unit Price</label>
                    <input type="number" class="form-control" id="unitPrice" value="${data.unitPrice}" min="0" required>
                </div>
            </div>
            <button class="btn btn-primary" type="submit">Save</button>`;
        $("#formEdit").html(resultRender);
    }
}