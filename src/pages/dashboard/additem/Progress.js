import React, { useEffect } from 'react'
import useStorage from '../../../contexts/UseStorage'
// import s from './Progress.modules.css'
import './style.scss'

function Progress({ file, setFile, currentFile }) {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);



  return (
    <div className="add-item progressBar"
      // initial={{ width: 0 }}
      // animate={{ width: progress + '%' }}
    >{progress}%</div>

    // <motion.div className={s.progressBar}
    //   initial={{ width: 0 }}
    //   animate={{ width: progress + '%' }}
    // ></motion.div>
  )
}

export default Progress
