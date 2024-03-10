
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBzj7dBiCHbhyNyhaGvYNK0HMCRL4rgQ0k",
  authDomain: "newsportal-43180.firebaseapp.com",
  projectId: "newsportal-43180",
  storageBucket: "newsportal-43180.appspot.com",
  messagingSenderId: "412073587945",
  appId: "1:412073587945:web:9dbd24d3d8b42365a22c78"
};


const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
export const imagedb = getStorage(app)