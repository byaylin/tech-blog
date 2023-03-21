document.querySelector("#loginForm").addEventListener("submit", e=>{
    e.preventDefault();
    const loginObj = {
        username: document.querySelector("#loginUser").value,
        password: document.querySelector("#loginPassword").value
    }
    console.log(loginObj)
    fetch("/login",{
        method: "POST",
        body: JSON.stringify(loginObj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok) {
           location.href="/profile"
        } else {
            alert("oops wrong username or password")
        }
    })
  });