import React from 'react';
import Papa from 'papaparse';

const FileSelection = ({ onFileSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      parseFile(file);
    }
  };

  const parseFile = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      let parsedData;

      // Check if the file is a CSV
      if (file.name.endsWith('.csv')) {
        parsedData = Papa.parse(event.target.result, { header: true }).data;
      }
      // Check if the file is a JSON
      else if (file.name.endsWith('.json')) {
        try {
          parsedData = JSON.parse(event.target.result);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return;
        }
      } else {
        console.error('Unsupported file type.');
        return;
      }

      console.log("Parsed Result:", parsedData);
      if (typeof onFileSelect === 'function') {
        onFileSelect(parsedData);
      }
    };

    // Read the file content
    reader.readAsText(file);
  };

  return (
    <div className="file-selection-card">
      <h2>Step1: Select File</h2>
      <input type="file" accept=".csv, .json" onChange={handleFileChange} />
      <p>Accepted file types: CSV, JSON</p>
    </div>
  );
};

export default FileSelection;
