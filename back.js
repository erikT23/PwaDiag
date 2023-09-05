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

function showAll() {
  const url = 'https://reqres.in/api/users?page=2';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      updateTable(data);
    })
    .catch(error => {
      console.error('Error al obtener los registros:', error);
    });
}

function updateTable(records) {
  const tableBody = document.querySelector('tbody');

  tableBody.innerHTML = '';

  records.data.forEach((record, index) => {
    const newRow = tableBody.insertRow();

    const numberCell = newRow.insertCell(0);
    numberCell.textContent = index + 1;

    const titleCell = newRow.insertCell(1);
    titleCell.textContent = record.first_name; // Access 'first_name' property

    const descriptionCell = newRow.insertCell(2);
    descriptionCell.textContent = record.last_name; // Access 'last_name' property

    const authorCell = newRow.insertCell(3);
    authorCell.textContent = record.email; // Access 'email' property

    const creationDateCell = newRow.insertCell(4);
    // Since there's no 'createdAt' property in the data, you can leave this cell empty or set your own data if needed.
    creationDateCell.textContent = '';
  });
}

function updateRecord() {
  const id = document.getElementById('editId').value;
  const title = document.getElementById('editTitle').value;
  const description = document.getElementById('editDescription').value;
  const author = document.getElementById('editAuthor').value;

  if (!id || !title || !description || !author) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos antes de guardar los cambios.',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: () => Swal.isVisible(),
    });
    return;
  }

  const data = {
    title: title,
    description: description,
    author: author,
  };

  fetch(`https://reqres.in/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Actualización exitosa!',
          text: 'Los cambios se han guardado correctamente.',
          confirmButtonText: 'Aceptar',
        });

        showAll();

        const editModal = document.getElementById('editModal');
        const bootstrapEditModal = new bootstrap.Modal(editModal);
        bootstrapEditModal.hide();
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'La actualización del registro no fue exitosa. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Aceptar',
        });
      }
    })
    .catch((error) => {
      console.error('Error al actualizar el registro:', error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ha ocurrido un error al actualizar el registro. Por favor, inténtalo nuevamente.',
        confirmButtonText: 'Aceptar',
      });
    });
}

function deleteRecord() {
  const id = document.getElementById('deleteId').value;

  if (!id) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, ingresa el ID del registro que deseas eliminar.',
      confirmButtonText: 'Aceptar',
    });
    return;
  }

  const url = `https://reqres.in/api/users/${id}`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'accept': '*/*',
    },
  })
    .then((response) => {
      if (response.status === 204) {
        Swal.fire({
          icon: 'success',
          title: '¡Eliminación exitosa!',
          text: 'El registro ha sido eliminado correctamente.',
          confirmButtonText: 'Aceptar',
        });

        showAll();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => {
      console.error('Error al eliminar el registro:', error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'No se pudo eliminar el registro.',
        confirmButtonText: 'Aceptar',
      });
    });

  const deleteModal = document.getElementById('deleteModal');
  const bootstrapDeleteModal = new bootstrap.Modal(deleteModal);
  bootstrapDeleteModal.hide();
  document.getElementById('deleteId').value = '';
}
