let domain = "http://localhost:39531";

function handleError(response, message) {
    Swal.fire({
      icon: "error",
      title: message,
      text: response.status + " - " + response.statusText
    });

    console.log(JSON.stringify(response));
  }