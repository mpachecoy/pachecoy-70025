const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", async(e) =>{
    e.preventDefault();
    let first_name = inputNombre.value.trim();
    let last_name = inputApellido.value.trim();
    let email = inputEmail.value.trim();
    let password = inputPassword.value.trim();

    if(!first_name || !last_name || !email || !password){
        alert("Complete los datos...!!!");
        return ;
    }

    let body = JSON.stringify({
        first_name,
        last_name,
        email, 
        password
    });

    let respuesta = await fetch("/api/sessions/registro", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body
    });

    let datos = await respuesta.json();
    if(respuesta.status === 201){
        location.href=`/login?mensaje=Registro correcto para ${email}...!!!`
    }else{
        alert(datos.error);
    }
});
