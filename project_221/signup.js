
// Grab elements
const loginBtn = document.querySelector(".login-btn");
const leftPanel= document.querySelector(".left-panel");
const rightPanel = document.querySelector(".right-panel");
const loginSection = document.querySelector(".left-login-section");


// Add click event
loginBtn.addEventListener("click", () => {
  rightPanel.style = " animation: side-right 3.5s ease-in-out;";
  rightPanel.style.animationFillMode = "forwards";
  leftPanel.style = " animation: slide 2s ease-in-out;";
  leftPanel.style.animationFillMode = "forwards";
  
  

  setTimeout(() => {
    leftPanel.style.display = "inline-block";
    leftPanel.style.position = "absolute";
    rightPanel.style.display = "none";
    loginSection.style.display = "grid";
    
    
  }, 800); // matches transition duration
});
