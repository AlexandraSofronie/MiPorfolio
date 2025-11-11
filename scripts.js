let menuVisible = false;

// Mostrar / ocultar menú responsive
function mostrarMenu() {
  const nav = document.getElementById("nav");
  if (menuVisible) {
    nav.classList = "";
    menuVisible = false;
  } else {
    nav.classList = "responsive";
    menuVisible = true;
  }
}

// Cerrar el menú al seleccionar un enlace
function seleccionar() {
  document.getElementById("nav").classList = "";
  menuVisible = false;
}

// Cuando se carga el documento
document.addEventListener("DOMContentLoaded", function () {
  const seccionHabilidades = document.querySelector("#habilidades");
  const barras = document.querySelectorAll(".progreso");
  const softSkills = document.querySelectorAll(".softskills li");

  if (seccionHabilidades) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Añadir animación a las barras de progreso
            barras.forEach((barra) => {
              barra.classList.add("animar");
            });

            // Animación secuencial de soft skills
            softSkills.forEach((skill, index) => {
              skill.style.opacity = "0";
              setTimeout(() => {
                skill.style.transition =
                  "opacity 0.6s ease, transform 0.6s ease";
                skill.style.opacity = "1";
                skill.style.transform = "translateX(0)";
              }, 150 * index);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(seccionHabilidades);
  }
});

// Animar las barras técnicas e idiomas
document.addEventListener("scroll", () => {
  const barras = document.querySelectorAll(".progreso.animar");
  barras.forEach((barra) => {
    const porcentaje = barra.querySelector("span").textContent;
    barra.style.width = porcentaje;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const typing = document.querySelector(".typing-text");
  if (!typing) return;

  const text = typing.getAttribute("data-text");
  typing.textContent = "";

  // Crear el cursor como span inline
  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  typing.appendChild(cursor);

  let i = 0;

  function escribir() {
    if (i < text.length) {
      // Insertar letra justo antes del cursor
      cursor.insertAdjacentText("beforebegin", text[i]);
      i++;
      setTimeout(escribir, 150); // velocidad
    } else {
      // Cuando termina, eliminar cursor
      cursor.remove();
    }
  }

  escribir();
});

// FORMULARIO CON EMAILJS - FUNCIONA INSTANTÁNEAMENTE
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario-contacto");

  if (formulario) {
    // Crear elemento para mensajes
    const mensajeResultado = document.createElement("div");
    mensajeResultado.id = "mensaje-resultado";
    mensajeResultado.style.display = "none";
    mensajeResultado.style.marginTop = "20px";
    mensajeResultado.style.padding = "15px";
    mensajeResultado.style.borderRadius = "8px";
    mensajeResultado.style.textAlign = "center";
    mensajeResultado.style.fontWeight = "500";
    formulario.appendChild(mensajeResultado);

    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtener datos del formulario
      const datos = {
        from_name: formulario.nombre.value,
        from_email: formulario.email.value,
        subject: formulario.asunto.value,
        message: formulario.mensaje.value,
        to_name: "Alexandra",
      };

      // Validaciones básicas
      if (
        !datos.from_name ||
        !datos.from_email ||
        !datos.subject ||
        !datos.message
      ) {
        mostrarMensaje("❌ Todos los campos son obligatorios.", false);
        return;
      }

      if (!isValidEmail(datos.from_email)) {
        mostrarMensaje("❌ Por favor, ingresa un email válido.", false);
        return;
      }

      // Mostrar loading
      const boton = formulario.querySelector("button");
      const textoOriginal = boton.innerHTML;
      boton.innerHTML =
        'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
      boton.disabled = true;

      // CONFIGURACIÓN EMAILJS CON TUS IDs
      emailjs
        .send("service_dl5sam5", "template_hdfb8nf", datos)
        .then(function (response) {
          console.log("✅ Email enviado!", response);
          mostrarMensaje(
            "✅ ¡Mensaje enviado con éxito! Te responderé pronto por email.",
            true
          );
          formulario.reset();
        })
        .catch(function (error) {
          console.error("❌ Error EmailJS:", error);
          mostrarMensaje(
            "⚠️ Error al enviar. Por favor, contáctame directamente por email.",
            false
          );
        })
        .finally(() => {
          // Restaurar botón
          boton.innerHTML = textoOriginal;
          boton.disabled = false;
        });
    });

    function mostrarMensaje(texto, esExito) {
      mensajeResultado.style.display = "block";
      mensajeResultado.textContent = texto;

      if (esExito) {
        mensajeResultado.style.backgroundColor = "#d4edda";
        mensajeResultado.style.color = "#155724";
        mensajeResultado.style.border = "1px solid #c3e6cb";
      } else {
        mensajeResultado.style.backgroundColor = "#f8d7da";
        mensajeResultado.style.color = "#721c24";
        mensajeResultado.style.border = "1px solid #f5c6cb";
      }

      // Ocultar después de 5 segundos
      setTimeout(() => {
        mensajeResultado.style.display = "none";
      }, 5000);
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
});
