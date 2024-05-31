import { firestore, storage } from "./config";
import { nanoid } from "nanoid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export async function uploadImageToFBS(image: File, userId: string) {
  try {
    const fileName = nanoid()
    const filePath = `images/${userId}/${fileName}`
    const imageRef = ref(storage, filePath)
    await uploadBytesResumable(imageRef, image)
    const url = await getDownloadURL(imageRef)
    const collectionRef = collection(firestore, "images")
    const data = {
      imageId: fileName,
      url,
      userId,
      noOfClick: 0,
    }
    await addDoc(collectionRef, data)
  } catch (e) {
    console.log("Could not upload image")
  }
}

export async function getAllImagesByUserId(userId: string) {
  const q = query(collection(firestore, "images"), where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const images = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return images as Image[];
  } catch (error) {
    console.error("Error getting images:", error);
    return [];
  }
}

export async function getImageByIdAndUserId(userId: string, imageId: string) {
  const docRef = doc(collection(firestore, "images"), imageId);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const imageData = docSnap.data();
      if (imageData.userId === userId) {
        return imageData;
      } else {
        console.warn("Image ID found, but user ID mismatch.");
        return null;
      }
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting image:", error);
    return null;
  }
}

export async function deleteImageById(imageId: string) {
  const q = query(collection(firestore, "images"), where("imageId", "==", imageId))
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.warn("No image found with the provided imageID.");
      return; // Handle case where no image exists
    }
    const doc = querySnapshot.docs[0]; // Get the first document (assuming only one image with that ID)
    await deleteDoc(doc.ref);
    console.log("Image deleted successfully!");
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

