import React, { useState } from 'react';
import './Specifyformat.css';

const SpecifyFormat = () => {
  // State variables to manage selected options
  const [fileType, setFileType] = useState('CSV');
  const [characterEncoding, setCharacterEncoding] = useState('UTF-8');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(false);

  return (
    <div className="card">
      <h2>Step 2: Specify Format</h2>

      {/* File Type Dropdown */}
      <div className="form-group">
        <label>File Type:</label>
        <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
          <option value="CSV">CSV</option>
          <option value="JSON">JSON</option>
          {/* Add other file types as needed */}
        </select>
      </div>

      {/* Character Encoding Dropdown */}
      <div className="form-group">
        <label>Character Encoding:</label>
        <select value={characterEncoding} onChange={(e) => setCharacterEncoding(e.target.value)}>
          <option value="UTF-8">UTF-8</option>
          {/* Add other character encodings as needed */}
        </select>
      </div>

      {/* Delimiter Dropdown */}
      <div className="form-group">
        <label>Delimiter:</label>
        <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
          <option value=",">Comma</option>
          <option value=";">Semicolon</option>
          {/* Add other delimiters as needed */}
        </select>
      </div>

      {/* Has Header Checkbox */}
      <div className="form-group">
        <label>
          <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
          Has Header
        </label>
      </div>
    </div>
  );
};

export default SpecifyFormat;
