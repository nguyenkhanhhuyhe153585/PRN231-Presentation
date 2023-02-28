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
      var data = XmlSerializer(dataRequest);
  
      $.ajax({
        url: domain + "/api/product",
        type: "POST",
        data: data,
        contentType: "text/xml",
        dataType: "xml",
        success: handleSuccess,
        error: handleError,
      });
  
      function XmlSerializer(data){
        var productDTO = `<ProductDTO>
            <ProductName>${data.productName}</ProductName>
            <CategoryId>${data.categoryId}</CategoryId>
            <UnitsInStock>${data.unitsInStock}</UnitsInStock>
            <UnitPrice>${data.unitPrice}</UnitPrice>
        </ProductDTO>`;
        return productDTO;
      }

      function handleSuccess(response) {
        window.history.back();
      }
  
      function handleError(response) {
        Swal.fire({
          icon: "error",
          title: response.status + " - " + response.statusText,
        });
        console.log(response);
      }
    });
  }
  
  function loadCategorySelectList() {
    $.ajax({
      url: domain + "/api/category",
      type: "GET",
      dataType: "xml",
      success: function (response) {
        console.log(response);
        renderXml(response);
      },
      error: function (response) {
        handleError(response, "Can not load categories data");
      },
    });
  
    function renderXml(data) {
      let resultRender = "";
      $(data).find("CategoryDTO").each(function(){
        resultRender += `<option value="${$(this).find("CategoryID").text()}">${$(this).find("CategoryName").text()}</option>`;
      })
      $("#selectCategory").append(resultRender);
    }
  }
  