let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){

    document.getElementById("nav").classList = "";
    menuVisible = false;
}

document.addEventListener("DOMContentLoaded", function () {
    const seccion = document.querySelector("#habilidades");

    if (seccion) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const barras = seccion.querySelectorAll(".progreso");
                    barras.forEach(barra => {
                        barra.classList.add("animar");
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(seccion);
    }
});