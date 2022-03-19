const config = {

	apiKey: "AIzaSyDYRE4qZ6c2_b7IYPkk-MFNkwEwg3s98OI",
  
	authDomain: "dash-1fc23.firebaseapp.com",
  
	databaseURL: "https://dash-1fc23-default-rtdb.firebaseio.com",
  
	projectId: "dash-1fc23",
  
	storageBucket: "dash-1fc23.appspot.com",
  
	messagingSenderId: "744177520112",
  
	appId: "1:744177520112:web:83544617c94ddfc305a135"
  
  };
  

//   const config = {

// 	apiKey: "AIzaSyAMQn5qIPLpYUhwlJUTTonMSx4vA3e7ls8",
  
// 	authDomain: "prmnew-6cf92.firebaseapp.com",
  
// 	projectId: "prmnew-6cf92",
  
// 	storageBucket: "prmnew-6cf92.appspot.com",
  
// 	messagingSenderId: "901196235731",
  
// 	appId: "1:901196235731:web:1af2d1058d29138cb62526"
  
//   };

// Initialize Firebase
/*
var config = {
    apiKey: "AIzaSyAQWQaIRRRyCteybkhf-h88xXvNhUJaihQ",
  authDomain: "prm1-c257b.firebaseapp.com",
  databaseURL: "https://prm1-c257b-default-rtdb.firebaseio.com",
  projectId: "prm1-c257b",
  storageBucket: "prm1-c257b.appspot.com",
  messagingSenderId: "251170869670",
  appId: "1:251170869670:web:4f70383d5da6341cb83f67",
  measurementId: "G-9Y4JRHPEYX"
};
*/

firebase.initializeApp(config);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');


	readUserData(); 
	

// --------------------------
// READ
// --------------------------
function readUserData() {

	const userListUI = document.getElementById("user-list");

	usersRef.on("value", snap => {

		userListUI.innerHTML = ""

		snap.forEach(childSnap => {

			let key = childSnap.key,
				value = childSnap.val()
  			
			let $li = document.createElement("h6");

			// edit icon
			let editIconUI = document.createElement("span");
			editIconUI.class = "edit-user";
			editIconUI.innerHTML = ":";
			editIconUI.setAttribute("userid", key);
			editIconUI.addEventListener("click", editButtonClicked)

			// delete icon
			let deleteIconUI = document.createElement("span");
			deleteIconUI.class = "delete-user";
			deleteIconUI.innerHTML = " ☓";
			deleteIconUI.setAttribute("userid", key);
			deleteIconUI.addEventListener("click", deleteButtonClicked)
			value.name = "Click to view data"
			$li.innerHTML = value.name;
			$li.append(editIconUI);
			$li.append(deleteIconUI);

			$li.setAttribute("user-key", key);
			$li.addEventListener("click", userClicked)
			userListUI.append($li);

 		});


	})

}



function userClicked(e) {


		var userID = e.target.getAttribute("user-key");

		const userRef = dbRef.child('users/' + userID);
		const userDetailUI = document.getElementById("user-detail");

		userRef.on("value", snap => {

			userDetailUI.innerHTML = ""

			snap.forEach(childSnap => {
				var $p = document.createElement("p");
				$p.innerHTML = childSnap.key  + " - " +  childSnap.val();
				userDetailUI.append($p);
			})

		});
	

}





// --------------------------
// ADD
// --------------------------

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked)



function addUserBtnClicked() {

	const usersRef = dbRef.child('users');

	const addUserInputsUI = document.getElementsByClassName("user-input");

 	// this object will hold the new user information
    let newUser = {};

    // loop through View to get the data for the model 
    for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

        let key = addUserInputsUI[i].getAttribute('data-key');
        let value = addUserInputsUI[i].value;
        newUser[key] = value;
    }

	usersRef.push(newUser)
    alert("Submitted")

    
   console.log(myPro)
   


}


// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

		e.stopPropagation();

		var userID = e.target.getAttribute("userid");

		const userRef = dbRef.child('users/' + userID);
		
		userRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {
	
	document.getElementById('edit-user-module').style.display = "block";

	//set user id to the hidden input field
	document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));

	// set data to the user field
	const editUserInputsUI = document.querySelectorAll(".edit-user-input");


	userRef.on("value", snap => {

		for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

			var key = editUserInputsUI[i].getAttribute("data-key");
					editUserInputsUI[i].value = snap.val()[key];
		}

	});




	const saveBtn = document.querySelector("#edit-user-btn");
	saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {
 
	const userID = document.querySelector(".edit-userid").value;
	const userRef = dbRef.child('users/' + userID);

	var editedUserObject = {}

	const editUserInputsUI = document.querySelectorAll(".edit-user-input");

	editUserInputsUI.forEach(function(textField) {
		let key = textField.getAttribute("data-key");
		let value = textField.value;
  		editedUserObject[textField.getAttribute("data-key")] = textField.value
	});



	userRef.update(editedUserObject);

	document.getElementById('edit-user-module').style.display = "block";


}



        








