
const islogged=false;
function ToSignin(){
location.assign("signin.html");
}
function ToIndex() {
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const terms = document.getElementById("terms").checked;

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (!terms) {
    alert("You must accept the Terms & Conditions.");
    islogged=true;
    return;
  }

  // If all good → redirect
  location.replace("index.html");
}
