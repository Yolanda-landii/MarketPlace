import { getDoc, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase'; // Ensure you export `storage` from your Firebase config
import axios from 'axios';


// Function to get user profile data
export async function getUserProfile(uid) {
  const userDoc = await getDoc(doc(db, 'users', uid));
  return userDoc.exists() ? userDoc.data() : null;
}

// Function to update user profile data
export async function updateProfile(uid, profileData) {
  await setDoc(doc(db, 'users', uid), profileData, { merge: true });
}

// Function to check admin status



// Function to check admin status
export const checkAdminStatus = async (token) => {
  console.log("Checking admin status with token:", token); // Log the token

  try {
    const response = await axios.get('http://localhost:5000/api/auth/checkAdmin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && typeof response.data.isAdmin === 'boolean') {
      return response.data.isAdmin;
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error checking admin status:', error.message);
    return false; // Default to false if there’s an error
  }
};




// Function to upload a profile picture and get the download URL
export async function uploadProfilePicture(uid, file) {
  const storageRef = ref(storage, `profilePictures/${uid}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}