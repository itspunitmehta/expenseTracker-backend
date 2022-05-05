const loginToken = localStorage.getItem('token');
const btn = document.getElementById('btn');
const nav = document.getElementById('nav');

btn.addEventListener('click', ()=>{
    nav.classList.toggle('active');
    btn.classList.toggle('active');
})


window.addEventListener('load',()=>{
    axios.get('http://34.207.152.50:8000/purchase/premium/leaderboard',{headers: {authorization:loginToken} })
.then(response=>{
    // console.log(response.data.users)
    response.data.users.forEach(user => {
        console.log(user.name)
        addUserListToDOM(user.name)
    });
})
.catch(err=>{
    console.log(err)
})
})




function addUserListToDOM(users){
    const parentElement = document.getElementById('listofusers');
    parentElement.innerHTML += `
        <li id=${users}>
            ${users} - ${users} - ${users}
        </li>`
}