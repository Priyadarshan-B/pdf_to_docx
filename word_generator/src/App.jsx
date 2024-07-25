import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!pdfFile) return;

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      const response = await axios.post('http://localhost:5000/convert', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Convert to DOCX</button>
      {downloadLink && (
        <a href={downloadLink} download="document.docx">
          Download DOCX
        </a>
      )}
    </div>
  );
}

export default App;
