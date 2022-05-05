function signin(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const userDetails = {
        email: form.get("email"),
        password: form.get("password")  
    }
    console.log(userDetails)
    axios.post('http://34.207.152.50:8000/user/signin',userDetails).then(res => {
        if(res.status === 200){
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            // localStorage.setItem('userDetails', JSON.stringify(res.data.user))
            window.location.href = "../expense/userhome.html"
            // alert('sign up succsefully');
        } else {
            throw new Error('Failed to login')
        }
    }).catch(err => {
        console.log(err);
    })
}