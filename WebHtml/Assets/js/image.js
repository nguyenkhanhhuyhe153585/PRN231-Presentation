$(document).ready(function () {
  loadImage();
  uploadImage();
});

function loadImage() {
  $("#loadImage").click(function () {
    $.ajax({
      url: domain + "/api/image/base64",
      type: "GET",
      dataType: "text/plain",
      complete: function (xhr) {
        if (xhr.status === 200) {
          $("#imageBase64").attr(
            "src",
            "data:image/png;base64," + xhr.responseText
          );
        }
      },
    });
  });
}

function uploadImage() {
  $("#uploadImage").click(function () {
    var file_datas = $("#image").prop("files");
    var form_data = new FormData();
    for (var fdata of file_datas) {
      form_data.append("file", fdata);
    }
    $.ajax({
      url: domain + "/api/image",
      data: form_data,
      type: "POST",
      processData: false,
      contentType: false,
      cache: false,
      success: function (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Upload image success",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: function (response) {
        Swal.fire({
          icon: "error",
          title: response.status + " - " + response.statusText,
        });
      },
    });
  });
}
