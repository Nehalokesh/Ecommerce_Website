function login(e){
    e.preventDefault();

    const loginDetails = {
        email:e.target.email.value,
        password:e.target.password.value
    }
    console.log(loginDetails);

    axios.post("http://localhost:3000/login",loginDetails)
    .then(result=>{
        alert("successfully logged in")
        // console.log(result)
    })
    .catch(err =>{
        console.log(err)
    });

    e.target.email.value="";
    e.target.password.value="";
}