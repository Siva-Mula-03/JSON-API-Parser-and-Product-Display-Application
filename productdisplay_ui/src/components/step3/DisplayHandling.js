import React, { useState } from 'react';
import './DisplayHandling.css';
import '../step1/FileSelection.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DisplayHandling = ({ onNext, initialSelectedFields }) => {
  const availableFields = [
    'Product Id',
    'Subcategory',
    'Title',
    'Price',
    'Popularity',
    'Description',
    'Rating',
    'UTM Source',
    'UTM Medium'
  ];

  const [selectedFields, setSelectedFields] = useState(initialSelectedFields || []);
  const [chosenFields, setChosenFields] = useState([]);
  
  const navigate = useNavigate(); // Hook to programmatically navigate

  const moveFieldToSelected = () => {
    const newAvailable = availableFields.filter(f => !chosenFields.includes(f));
    setSelectedFields(prev => [...prev, ...chosenFields]);
    setChosenFields([]);
  };

  const moveFieldToAvailable = () => {
    const newSelected = selectedFields.filter(f => !chosenFields.includes(f));
    setSelectedFields(newSelected);
    setChosenFields([]);
  };

  const toggleChosenField = (field) => {
    setChosenFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
  };

  const handleNext = () => {
    console.log("Selected Fields before sending to App:", selectedFields);
    onNext(selectedFields);
    
    // Navigate to '/datatable' after handling the selected fields
    navigate('/datatable');
  };

  return (
    <div className="file-selection-card">
      <h2>Step 3: Display Handling</h2>
      <div className="field-container">
        <div className="field-section">
          <h3>Available Fields</h3>
          <ul>
            {availableFields.map((field, index) => (
              <li 
                key={index} 
                onClick={() => toggleChosenField(field)}
                className={chosenFields.includes(field) ? 'selected' : ''}
              >
                {field}
              </li>
            ))}
          </ul>
        </div>
        <div className="control-buttons">
          <button onClick={moveFieldToSelected} disabled={chosenFields.length === 0}>&gt;&gt;</button>
          <button onClick={moveFieldToAvailable} disabled={chosenFields.length === 0}>&lt;&lt;</button>
        </div>
        <div className="field-section">
          <h3>Fields to be Displayed</h3>
          <ul>
            {selectedFields.map((field, index) => (
              <li key={index} onClick={() => toggleChosenField(field)}>
                {field}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />
      {/* Add a Next button to proceed */}
      <button onClick={() => handleNext(selectedFields)}>Next</button>

    </div>
  );
};

export default DisplayHandling;
