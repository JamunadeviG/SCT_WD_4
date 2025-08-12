function signup() {
    let username = document.getElementById("signup-username").value.trim();
    let password = document.getElementById("signup-password").value.trim();

    fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.success) window.location.href = "signin.html";
    });
}

function signin() {
    let username = document.getElementById("signin-username").value.trim();
    let password = document.getElementById("signin-password").value.trim();

    fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            localStorage.setItem("loggedInUser", username);
            window.location.href = "home.html";
        }
    });
}
