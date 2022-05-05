function signup(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const userDetails = {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        password: form.get("password")  
    }
    console.log(userDetails)
    axios.post('http://34.207.152.50:8000/user/signup',userDetails).then(res => {
        if(res.status === 201){
            window.location.href = "../login/login.html"
            alert(`${res.data.message}`);
        }
    }).catch(err => {
        // alert('User already exist!! Please Sign In')
        // window.location.href = "../login/login.html"
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}