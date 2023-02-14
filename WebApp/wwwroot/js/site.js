let domain = "http://localhost:39531";
let pid = 0;
$(document).ready(function () {
    if (isPath("/product")) {
        loadProductList();
    } else if (isPath("/product/create")) {
        loadCategorySelectList();
        createProduct();
    } else if (isPath("/product/edit?id=")) {
        loadEditForm();
        editProduct();
    }
});

function isPath(path) {
    return window.location.pathname.toLowerCase() === path.toLowerCase();
}

function createProduct() {
    $("#formProduct").submit(function (event) {
        event.preventDefault();

        let productName = $("#productName").val();
        let categoryId = Number($("#selectCategory").val());
        let unitInStock = Number($("#unitInStock").val());
        let unitPrice = Number($("#unitPrice").val());

        let dataRequest = {
            productName: productName,
            categoryId: categoryId,
            unitsInStock: unitInStock,
            unitPrice: unitPrice
        }

        $.ajax({
            url: domain + "/api/product",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(dataRequest),
            success: handleSuccess,
            error: handleError

        });

        function handleSuccess(response) {
            window.history.back();
        }

        function handleError(response) {
            Swal.fire({
                icon: 'error',
                title: response.status + " - " + response.statusText
            })

            console.log(JSON.stringify(response));
        }
    });
}

function editProduct() {
    $("formEdit").submit(function (event) {
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
            success: handleSuccess,
            error: handleError
        });

        function handleSuccess(response) {
            window.history.back();
        }

        function handleError(response) {
            Swal.fire({
                icon: 'error',
                title: response.status + " - " + response.statusText
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
        // <option value="${data.categoryID}" selected>${data.categoryName}</option>
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
                result +=
                    ` <option value="${item.categoryID}" ((${item.categoryID} == ${data.categoryID}) ? "selected" : "") >${item.categoryName}</option>`
                    ;
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

function getIdUrl() {
    var url = new URLSearchParams(window.location.search);
    let id = url.get('id');
    console.log(id);
    return id;
}

function loadProductList() {
    $.ajax({
        url: domain + "/api/product",
        type: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            render(response);
        }
    });

    function render(data) {
        let resultRender = "";
        for (let item of data) {
            resultRender +=
                `<div class="col mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.productName}</h5>
                            <p class="card-text">Unit Price: ${item.unitPrice}</p>
                            <p class="card-text">Units In Stock: ${item.unitsInStock}</p>
                            <a href="product/edit?id=${item.productId}" class="btn btn-primary">Detail</a>
                        </div>
                    </div>
                </div>`
                ;
        }
        $("#cardDeck").html(
            resultRender
        );
    }
}

function loadCategorySelectList() {
    $.ajax({
        url: domain + "/api/category",
        type: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            render(response);
        }
    });

    function render(data) {
        let resultRender = "";
        for (let item of data) {
            resultRender +=
                ` <option value="${item.categoryID}">${item.categoryName}</option>`
                ;
        }
        $("#selectCategory").append(resultRender);
    }
}