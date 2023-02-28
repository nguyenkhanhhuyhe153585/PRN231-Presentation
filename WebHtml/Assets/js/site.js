let domain = "http://localhost:39531";
// let domain = "https://a3dc-27-66-88-47.ap.ngrok.io ";

function handleError(response, message) {
    Swal.fire({
      icon: "error",
      title: message,
      text: response.status + " - " + response.statusText
    });

    console.log(JSON.stringify(response));
  }