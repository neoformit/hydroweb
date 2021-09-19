// Provide a default error alert

const errorSwal = (error, title, subtitle, info) => {
  const title = title || "Error!";
  const subtitle = subtitle || "Sorry, the app encountered an error:";

  // Create an error alert - should really use sweet-alert or something by default

  alert(error);

}

export default errorSwal;
