// Toast message
const toastArea = document.getElementById("toast-msg");
const toastMsgArea = document.getElementById("toast-text");

// Nav
let nav = document.getElementById("nav-div");

// signUp
let name = document.getElementById("signup-name");
let mail = document.getElementById("signup-mail");
let pass = document.getElementById("signup-pass");
let cpass = document.getElementById("signup-c-pass");
const signupBtn = document.getElementById("signup");

// Nav anchors
let products = document.getElementById("prod");
let orders = document.getElementById("order");
let cart = document.getElementById("cart");

// error
let err = document.getElementById("error");

// Store local Storage
const store = (key, values) => {
  window.localStorage.setItem(key, JSON.stringify(values));
};

// Load local Storage
const load = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

// login button
let login = load("login");
if (!login) {
  nav.innerHTML = `<button id="login-btn" type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#signinModal" value=null>
                    Login
                  </button>`;
  products.classList.add("disabled");
  orders.classList.add("disabled");
  cart.classList.add("disabled");
} else {
  nav.innerHTML = `<button id="logout-btn"  class="btn btn-outline-danger">
                        Logout
                      </button>`;
  products.classList.remove("disabled");
  orders.classList.remove("disabled");
  cart.classList.remove("disabled");
}

// SignUp Button
if (signupBtn)
  signupBtn.addEventListener("click", () => {
    if (
      name.value != "" &&
      mail.value != "" &&
      pass.value != "" &&
      cpass.value != ""
    ) {
      const user = load(mail.value);
      if (pass.value !== cpass.value) {
        err.innerText = "Mismatch password";
        err.classList = "text-danger";
      } else if (user) {
        toastMsgArea.innerText = "User Already Registered. Try Login";
        toastArea.classList.add("d-block");
        setTimeout(() => {
          toast.classList.remove("d-block");
        }, 3000);
      } else {
        store(mail.value, {
          name: name.value,
          mail: mail.value,
          pass: pass.value,
        });
        window.location.href = "index.html";
      }
    } else {
      toastMsgArea.innerText = "SignUp Failed. Enter all values";
        toastArea.classList.add("d-block");
        setTimeout(() => {
          toast.classList.remove("d-block");
        }, 3000);
    }
  });

// Sign in
let usrMail = document.getElementById("signin-mail");
let usrPass = document.getElementById("signin-pass");
const signinBtn = document.getElementById("signin-btn");

if (signinBtn)
  signinBtn.addEventListener("click", () => {
    event.preventDefault();
    if (usrMail.value === "admin@kumaran.com" && usrPass.value === "kumaran") {
      window.location.href = "pages/adminPortal.html";
    } else {
      const data = load(usrMail.value);

      if (data !== null) {
        if (data.mail === usrMail.value && data.pass === usrPass.value) {
          store("login", true);
          sessionStorage.setItem("user", data.mail);
          login = load("login");
          window.location.href = "index.html";
        } else {
          toastMsgArea.innerText = "Incorrect Username or Password";
        toastArea.classList.add("d-block");
        setTimeout(() => {
          toast.classList.remove("d-block");
        }, 3000);
        }
      } else {
        toastMsgArea.innerText = "User Not found. Register first!";
        toastArea.classList.add("d-block");
        setTimeout(() => {
          toast.classList.remove("d-block");
        }, 5000);
      }
    }
  });

// Logout
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn)
  logoutBtn.addEventListener("click", () => {
    store("login", false);
    window.location.href = "/index.html";
  });

const user = sessionStorage.getItem("user");
if(!user){
  store("login",false);
}

