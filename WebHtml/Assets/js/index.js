$(document).ready(function () {
  loadProductList();
});

function loadProductList() {
  $.ajax({
    url: domain + "/api/product",
    type: "GET",
    dataType: "json",
    timeout: 5000,
    success: function (response) {
      console.log(response);
      render(response);
    },
    
    error: function(response){
      handleError(response, "Can not load products");
    }
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
                              <a href="edit.html?id=${item.productId}" class="btn btn-primary">Detail</a>
                              <a href="delete.html?id=${item.productId}" class="btn btn-primary">Delete</a>
                          </div>
                      </div>
                  </div>`;
    }
    $("#cardDeck").html(resultRender);
  }
}

function getParamUrl(){
  var url_params = new URLSearchParams(window.location.search);
  param = url_params.get('param');
  console.log(param); //returns jquery
}