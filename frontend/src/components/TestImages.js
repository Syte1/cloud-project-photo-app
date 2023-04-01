import React, { useState, useEffect } from 'react';

function TestImages() {
  const [fileUrl, setFileUrl] = useState('');

  const fetchFile = async () => {
    try {
      console.log("Calling fetch file.")
      const timestamp = new Date().getTime();
      const response = await fetch(`/images/image-1679262012297-997697120.gif?timestamp=${timestamp}`);
      const blob = await response.blob();
      setFileUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFile();
  }, []);

  return (
    <div>
      <img src={fileUrl} key='37773' alt="file" />
    </div>
  );
}

export default TestImages