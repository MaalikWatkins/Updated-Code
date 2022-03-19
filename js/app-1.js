const firebaseConfig = {
  apiKey: "AIzaSyAQWQaIRRRyCteybkhf-h88xXvNhUJaihQ",
  authDomain: "prm1-c257b.firebaseapp.com",
  projectId: "prm1-c257b",
  storageBucket: "prm1-c257b.appspot.com",
  messagingSenderId: "251170869670",
  appId: "1:251170869670:web:4f70383d5da6341cb83f67",
  measurementId: "G-9Y4JRHPEYX"
};
    firebase.initializeApp(firebaseConfig);
  
    const auth = firebase.auth()
  
  
    let signUpButton = document.getElementById('signup')
    signUpButton.addEventListener("click", (e) => {
      
      e.preventDefault()
      console.log("clicked")
      
  
      var email = document.getElementById("inputEmail")
      var password = document.getElementById("inputPassword")
      
      auth.createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        location.reload();
        // Signed in 
        var user = userCredential.user;
        console.log("user",user.email)
        alert("Signup Successful")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error code", errorCode)
        console.log("error Message", errorMessage)
        alert("Signup Failed")
      });
    })
  
  
  
  
  
  
  
  
    let signInButton = document.getElementById('signin')
    signInButton.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("clicked")
  
      var email = document.getElementById("inputEmail")
      var password = document.getElementById("inputPassword")
  
      auth.signInWithEmailAndPassword(email.value, password.value) 
      .then((userCredential) => {
      
        var user = userCredential.user;
        console.log("user",user.email)
        window.location = "index.html";
        alert('login')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // alert("error code", errorCode)
        alert( errorMessage)
        alert
      });
     })
  
  
  auth.onAuthStateChanged(function(user) {
    if (user) {
  
      var email = user.email
    
      var users = document.getElementById("user")
      var text = document.createTextNode(email);
  
      users.appendChild(text);
  
      console.log(users)
      //is signed in
    } else {
      //no user signed in
    }
  })