
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBKvvOXrl11YQoWjrCnX5fpqNzp16yuYrc",
  authDomain: "news-app-fea4d.firebaseapp.com",
  projectId: "news-app-fea4d",
  storageBucket: "news-app-fea4d.appspot.com",
  messagingSenderId: "890792137287",
  appId: "1:890792137287:web:f9579dc43cff53103f5762"
};


const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
export const imagedb = getStorage(app)