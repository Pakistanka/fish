import React, {useState, useEffect} from 'react'
import { projectFirestore, projectStorage } from '../firebase'
import { useAuth } from './AuthContext'

const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const { 
    url, 
    setUrl
  } = useAuth()

  useEffect(() => {
    
    const storageRef = projectStorage.ref(file.name);    
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes)*100;
      setProgress(percentage)
    }, (err) => {  
      setError(err)
    }, async () => {
      const url = await storageRef.getDownloadURL(); // this url will be saved in Firestore
      setUrl(url)
    })
  }, [file]);

  return {progress, url, error}
} 

export default useStorage

