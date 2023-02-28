$(document).ready(function () {
  loadProductList();
});

function loadProductList() {
  $.ajax({
    url: domain + "/api/product",
    type: "GET",
    dataType: "xml",
    timeout: 5000,
    success: function (response) {
      console.log(response);
      renderXml(response);
    },
    error: function (response) {
      handleError(response, "Can not load products");
    },
  });

  function renderXml(responseXml) {
    let resultRender = "";
    $(responseXml)
      .find("ProductDTO")
      .each(function () {
        resultRender += `<div class="col mb-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${$(this)
                  .find("ProductName")
                  .text()}</h5>
                <p class="card-text">Unit Price: 
                  ${$(this).find("UnitPrice").text()}
                </p>
                <p class="card-text">Units In Stock: ${$(this)
                  .find("UnitsInStock")
                  .text()}</p>             
            </div>
        </div>
    </div>`;
      });

    $("#cardDeck").html(resultRender);
  }
}
