class Usuario {
  constructor(id, nombre, cuenta, clave, email, rol) {
    this.id = id;
    this.nombre = nombre;
    this.cuenta = cuenta;
    this.clave = clave;
    this.email = email;
    this.rol = rol;
  }
  toString() {
    return this.nombre;
  }
  getRol() {
    return this.rol;
  }
  // Puedes agregar métodos para acceder a las propiedades si es necesario
  getCuenta() {
    return this.cuenta;
  }
  getClave() {
    return this.clave;
  }
}
class ControlUsuario {
  constructor() {
    this.lista = [];
  }
  adicionar(usuario) {
    // Evitar usuarios duplicados
    if (!this.lista.find(u => u.id === usuario.id)) {
      this.lista.push(usuario);
    } else {
      window.alert("Intento de agregar usuario duplicado:" + usuario.id);
    }
  }
  modificar(id, usuarioAct) {
    const usuarioIndex = this.lista.findIndex(user => user.id === id);
    if (usuarioIndex !== -1) {
      this.lista[usuarioIndex] = usuarioAct;
    } else {
      window.alert("Usuario no encontrado para modificar:" + id);
    }
    return this.lista;
  }
  accesoPermitido(cuenta, clave) {
    return this.lista.find(
      usuario => usuario.cuenta === cuenta && usuario.clave === clave
    );
  }
  obtenerListaUsuarios() {
    const usuarios = [
      {
        id: "1",
        nombre: "Ramiro",
        cuenta: "rduran",
        clave: "abc",
        email: "rduran@gmail.com",
        rol: "admin",
      },
      {
        id: "2",
        nombre: "Alberto",
        cuenta: "aduran",
        clave: "1234",
        email: "aquirogan@gmail.com",
        rol: "medico",
      },
      {
        id: "3",
        nombre: "Maria",
        cuenta: "mleascno",
        clave: "0123",
        email: "marian@gmail.com",
        rol: "operador",
      },
      {
        id: "4",
        nombre: "Juan",
        cuenta: "aldayus",
        clave: "12563",
        email: "juan@gmail.com",
        rol: "admin",
      },
      {
        id: "5",
        nombre: "Arminda",
        cuenta: "arminda",
        clave: "123223",
        email: "arminda@gmail.com",
        rol: "medico",
      },
    ];

    usuarios.forEach(user => {
      this.adicionar(
        new Usuario(
          user.id,
          user.nombre,
          user.cuenta,
          user.clave,
          user.email,
          user.rol
        )
      );
    });
    return this.lista;
  }
}
// Ejemplo de uso:
const controlUsuarios = new ControlUsuario();
controlUsuarios.obtenerListaUsuarios();

const registroForm = document.getElementById("registro");
const loginForm = document.getElementById("login");

function toggleForm() {
  loginForm.classList.toggle("registro-form");
  registroForm.classList.toggle("registro-form");
}

function registrar() {
  // Obtener los valores del formulario de registro
  const nombre = document.getElementById("nombre").value;
  const cuenta = document.getElementById("cuenta").value;
  const clave = document.getElementById("clave").value;
  const email = document.getElementById("email").value;

  // Validar el correo electrónico (puedes agregar una validación más robusta)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    window.alert("Error: Correo electrónico inválido");
    return;
  }
  // Crear una nueva instancia de Usuario y agregarla a la lista
  const newUser = new Usuario(
    (controlUsuarios.lista.length + 1).toString(), // Usar un ID único
    nombre,
    cuenta,
    clave,
    email,
    "usuario" // Puedes ajustar el rol según sea necesario
  );
  controlUsuarios.adicionar(newUser);

  // Puedes reiniciar el formulario aquí si lo deseas
  resetForm("registro-form");

  console.log("Usuario registrado:", newUser);
  console.log("Lista de Usuarios Actualizada:", controlUsuarios.lista);
}

function iniciarSesion() {
  // Obtener los valores del formulario de inicio de sesión
  const loginCuenta = document.getElementById("login-cuenta").value;
  const loginClave = document.getElementById("login-clave").value;

  // Verificar el inicio de sesión usando ControlUsuario
  const loggedInUser = controlUsuarios.accesoPermitido(loginCuenta, loginClave);

  if (loggedInUser) {
    toggleUserList();
    window.alert("Inicio de sesión exitoso:" + loggedInUser.nombre);
  } else {
    console.error("Inicio de sesión fallido. Verifica tus credenciales.");
    window.alert("Inicio de sesión fallido. Verifica tus credenciales.");
  }

  // Puedes reiniciar el formulario aquí si lo deseas
  resetForm("login-form");
}

function toggleUserList() {
  const userList = document.getElementById("user-list");
  loginForm.style.display = "none";
  userList.style.display = "block";
  if (userList.style.display === "block") {
    populateUserList();
  }
}
function resetForm(formId) {
  // Limpiar los campos del formulario
  const form = document.getElementById(formId);
  form.reset();
}
function populateUserList() {
  const userListBody = document.getElementById("user-list-body");
  // Limpiar la lista actual
  userListBody.innerHTML = "";
  // Llenar la tabla con los usuarios
  controlUsuarios.lista.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nombre}</td>
            <td>${user.cuenta}</td>
            <td>${user.email}</td>
            <td>${user.rol}</td>
          `;
    userListBody.appendChild(row);
  });
}
