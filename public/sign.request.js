
//Sign in
document.getElementById('signin').addEventListener('click',()=>{
    const userName = document.getElementById('username');
    const userPass = document.getElementById('userpassword');

    signin(userName,userPass)


});

function signin(name, pass){
    console.log(`Hello: ${name.value}\nYour Password: ${pass.value}`);
    const message = {
        name: name.value,
        password: pass.value
    }

    fetch('/SignIn',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    }).then(response => response.text())
    .then(data => {
        console.log(data)
    })
}