/* =============================
  SIMULACIÓN DE LOGIN Y ROLES
   ============================= */

// Datos simulados (en el futuro vendrán de la base de datos)
const usuarios = {
  redactor: { password: "1234", rol: "redactor" },
  supervisora: { password: "1234", rol: "supervisora" },
  admin: { password: "1234", rol: "admin" }
};

// Referencias a elementos del DOM
const loginSection = document.getElementById("login-section");
const dashboard = document.getElementById("dashboard");
const roleTitle = document.getElementById("role-title");
const sidebar = document.getElementById("sidebar");
const menuList = document.getElementById("menu-list");

// Asegura que solo se vea el login al inicio
dashboard.classList.add("hidden");      // Oculta completamente el dashboard
loginSection.style.display = "flex";    // Muestra el login
roleTitle.textContent = "";             // Limpia el título del sidebar


// Botones y entradas
document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("logout-btn").addEventListener("click", logout);

/* =============================
  FUNCIÓN DE LOGIN
   ============================= */
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (usuarios[username] && usuarios[username].password === password) {
    const rol = usuarios[username].rol;
    mostrarPanelPorRol(rol);
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

/* =============================
  FUNCIÓN DE LOGOUT
   ============================= */
function logout() {
  // Regresa al login y limpia vistas
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  dashboard.classList.add("hidden");
  loginSection.style.display = "flex";

  // Limpia el título y menú del sidebar
  roleTitle.textContent = "";
  menuList.innerHTML = "";
}


/* =============================
  CAMBIO DE PANEL SEGÚN ROL
   ============================= */
function mostrarPanelPorRol(rol) {
  // Oculta login
  loginSection.style.display = "none";
  dashboard.classList.remove("hidden");

  // Oculta todos los paneles antes de mostrar el del rol
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));

  // Variables de control
  let colorClase = "";
  let panelId = "";

  switch (rol) {
    case "redactor":
      colorClase = "redactor-theme";
      roleTitle.textContent = "Panel del Redactor";
      crearMenu([]); // El redactor no tiene botones de menú
      panelId = "panel-redactor";
      break;

    case "supervisora":
      colorClase = "supervisora-theme";
      roleTitle.textContent = "Panel de la Supervisora";
      crearMenu([
        { id: "panel-supervisora", icon: "fa-solid fa-check-to-slot", texto: "Aprobar Reportes" }
      ]);
      panelId = "panel-supervisora";
      break;

    case "admin":
      colorClase = "admin-theme";
      roleTitle.textContent = "Gestión de Usuarios";
      crearMenu([
        { id: "gestion-usuarios", icon: "fa-solid fa-users-gear", texto: "Usuarios" }
      ]);
      panelId = "gestion-usuarios";
      break;
  }

  // Cambia color del sidebar
  sidebar.className = colorClase;

  // Muestra el panel correspondiente al rol
  const panelMostrar = document.getElementById(panelId);
  if (panelMostrar) panelMostrar.classList.add("active");
}

/* =============================
  CREACIÓN DE MENÚ LATERAL
  ============================= */
function crearMenu(items) {
  menuList.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="${item.icon}"></i>${item.texto}`;
    li.dataset.id = item.id;
    li.addEventListener("click", () => mostrarPanel(item.id));
    menuList.appendChild(li);
  });
}

/* =============================
  MOSTRAR PANELES (GENÉRICO)
   ============================= */
function mostrarPanel(id) {
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  const panel = document.getElementById(id);
  if (panel) panel.classList.add("active");
}

/* =============================
  MOSTRAR FECHA Y HORA ACTUAL
   ============================= */
function actualizarFechaHora() {
  const ahora = new Date();
  const opciones = { 
    year: "numeric", month: "2-digit", day: "2-digit", 
    hour: "2-digit", minute: "2-digit", second: "2-digit" 
  };
  const fechaHora = document.getElementById("current-datetime");
  if (fechaHora) fechaHora.textContent = ahora.toLocaleString("es-MX", opciones);
}
setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();
