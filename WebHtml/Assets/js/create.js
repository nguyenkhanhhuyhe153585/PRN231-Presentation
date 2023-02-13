$(document).ready(function () {
    loadCategorySelectList();
    createProduct();
  });

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