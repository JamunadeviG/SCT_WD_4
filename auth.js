// signup function
function signup() {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    // basic validation
    if (!username || !password) {
        showMessage("Please fill in all fields", "error");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters long", "error");
        return;
    }

    if (localStorage.getItem("user_" + username)) {
        showMessage("Username already exists. Try another one.", "error");
        return;
    }

    // store user
    localStorage.setItem("user_" + username, password);
    showMessage("Account created successfully! Redirecting to sign in...", "success");

    setTimeout(() => {
        window.location.href = "signin.html";
    }, 1500);
}

// signin function
function signin() {
    const username = document.getElementById("signin-username").value.trim();
    const password = document.getElementById("signin-password").value.trim();
    const storedPass = localStorage.getItem("user_" + username);

    if (!username || !password) {
        showMessage("Please fill in all fields", "error");
        return;
    }

    if (storedPass && storedPass === password) {
        localStorage.setItem("loggedInUser", username);
        showMessage("Login successful! Redirecting...", "success");

        setTimeout(() => {
            window.location.href = "home.html";
        }, 1200);
    } else {
        showMessage("Invalid username or password", "error");
    }
}

// helper: display messages
function showMessage(text, type) {
    const msgBox = document.getElementById("message");
    if (msgBox) {
        msgBox.textContent = text;
        msgBox.className = type === "success" ? "msg success" : "msg error";
        msgBox.style.display = "block";

        setTimeout(() => {
            msgBox.style.display = "none";
        }, 3000);
    } else {
        alert(text); // fallback
    }
}
