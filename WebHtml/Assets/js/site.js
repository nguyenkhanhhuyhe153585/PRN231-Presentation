let domain = "http://localhost:39531";
$(document).ready(function () {
  if (isPath("/index.html")) {
    loadProductList();
  } else if (isPath("/create.html")) {
    loadCategorySelectList();
    createProduct();
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
      unitPrice: unitPrice,
    };

    $.ajax({
      url: domain + "/api/product",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(dataRequest),
      success: handleSuccess,
      error: handleError,
    });

    function handleSuccess(response) {
      window.history.back();
    }

    function handleError(response) {
      Swal.fire({
        icon: "error",
        title: response.status + " - " + response.statusText,
      });

      console.log(JSON.stringify(response));
    }
  });
}

function loadProductList() {
  $.ajax({
    url: domain + "/api/product",
    type: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response);
      render(response);
    },
  });

  function render(data) {
    let resultRender = "";
    for (let item of data) {
      resultRender += `<div class="col mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.productName}</h5>
                            <p class="card-text">Unit Price: ${
                              item.unitPrice
                            }</p>
                            <p class="card-text">Units In Stock: ${
                              item.unitsInStock
                            }</p>
                            <a href="${""}" class="btn btn-primary">Detail</a>
                        </div>
                    </div>
                </div>`;
    }
    $("#cardDeck").html(resultRender);
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
    },
  });

  function render(data) {
    let resultRender = "";
    for (let item of data) {
      resultRender += ` <option value="${item.categoryID}">${item.categoryName}</option>`;
    }
    $("#selectCategory").append(resultRender);
  }
}
