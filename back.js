function add() {
  const name = document.getElementById("a").value;
  const job = document.getElementById("b").value;
  const data = {
    name: name,
    job: job,
  };

  sendDataToEndpoint(data);
}

function sendDataToEndpoint(data) {
  const jsonData = JSON.stringify(data);

  const url = "https://reqres.in/api/users";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Los datos se han guardado correctamente.",
        confirmButtonText: "Aceptar",
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Ha ocurrido un error al guardar los datos.",
        confirmButtonText: "Aceptar",
      });
    });
}

function searchId() {
  const id = document.getElementById("idBusqueda").value;
  const url = `https://reqres.in/api/users/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.getElementById("ShowTitle").textContent = data.email;
      document.getElementById("ShowDescription").textContent = data.first_name;
      document.getElementById("ShowAuthor").textContent = data.last_name;

      const modal = document.getElementById("exampleModal2");
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.hide();
    })
    .catch((error) => {
      console.error("Error al obtener el registro:", error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Ha ocurrido un error al obtener el registro.",
        confirmButtonText: "Aceptar",
      });
    });
}
