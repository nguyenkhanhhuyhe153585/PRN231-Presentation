$(document).ready(function () {
  loadProductList();
});

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
                              <a href="edit.html?id=${item.productId}" class="btn btn-primary">Detail</a>
                              <a href="delete.html?id=${item.productId}" class="btn btn-primary">Delete</a>
                          </div>
                      </div>
                  </div>`;
    }
    $("#cardDeck").html(resultRender);
  }
}