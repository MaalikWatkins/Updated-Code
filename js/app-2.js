const firebaseConfig = {
    apiKey: "AIzaSyB845TuNQUIEjj86MWFga-6cGbA5WT44Xk",
    authDomain: "mylms-735c3.firebaseapp.com",
    databaseURL: "https://mylms-735c3.firebaseio.com",
    projectId: "mylms-735c3",
    storageBucket: "mylms-735c3.appspot.com",
    messagingSenderId: "2736999870",
    appId: "1:2736999870:web:b99bd26bb04c1d2d5b7def"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth()
  
   console.log(auth)
  
  
  
  let signOutButton = document.getElementById("signout")
  signOutButton.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("clicked")
    
    auth.signOut()
    alert("Signed Out")
    window.location = "./index.html";
  })