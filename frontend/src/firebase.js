import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// import firebase from "firebase/app";
// import firebase from 'firebase/compat/app';
// import { getStorage, ref } from "firebase/storage";
// const storage = getStorage();


const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};


// function listAll(folder) {
// 	const listRef = ref(storage, folder);
// 	const storageRef = firebase.storage().ref();

// 	// [START storage_list_all]
// 	// Create a reference under which you want to list
// 	// var listRef = storageRef.child(folder);

// 	// Find all the prefixes and items.
// 	listRef.listAll()
// 		.then((res) => {
// 			res.prefixes.forEach((folderRef) => {
// 				// All the prefixes under listRef.
// 				// You may call listAll() recursively on them.
// 			});
// 			res.items.forEach((itemRef) => {
// 				console.log(itemRef);
// 				// All the items under listRef.
// 				itemRef.getDownloadURL().then((url) =>{
// 					console.log("Download URL: " + url);
// 				})

// 			});
// 		}).catch((error) => {
// 			// Uh-oh, an error occurred!
// 			console.log(error);
// 		});
// 	// [END storage_list_all]
// }


// function listAll(folder) {
// 	// Create a reference under which you want to list
// 	const listRef = ref(storage, folder);

// 	// Find all the prefixes and items.
// 	listAll(listRef)
// 		.then((res) => {
// 			res.prefixes.forEach((folderRef) => {
// 				// All the prefixes under listRef.
// 				// You may call listAll() recursively on them.
// 			});
// 			res.items.forEach((itemRef) => {
// 				// All the items under listRef.
// 				itemRef.getDownloadURL().then((url) => {
// 					console.log("Download URL: " + url);
// 				})
// 			});
// 		}).catch((error) => {
// 			// Uh-oh, an error occurred!
// 			console.log(error);
// 		});
// }



const app = initializeApp(firebaseConfig);
// const storage = getStorage(app, process.env.REACT_APP_BUCKET_URL);
const storage = getStorage(app, "gs://fir-ab5dc.appspot.com");
// const storage = firebase.app().storage('gs://fir-ab5dc.appspot.com');

export default storage;

// firebase.initializeApp(firebaseConfig);
// // const storage = firebase.storage();
// export {storage, listAllImg, firebase as default};

