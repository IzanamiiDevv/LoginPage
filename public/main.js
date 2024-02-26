document.getElementById('login').addEventListener('click',()=>{
    const userName = document.getElementById('username');const userPass = document.getElementById('userpassword');

    login(userName,userPass)


});

function login(name, pass){
    console.log(`Hello: ${name.value}\nYour Password: ${pass.value}`);
    const message = {
        name: name.value,
        password: pass.value
    }

    fetch('/LogIn',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    }).then(response => response.text())
    .then(data => [
        console.log(data)
    ])
}
