import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FileSelection from './components/step1/FileSelection';
import SpecifyFormat from './components/step2/SpecifyFormat';
import DisplayHandling from './components/step3/DisplayHandling';
import DataDisplayPage from './DataDisplayPage';

function App() {
  const [parsedData, setParsedData] = useState([]);
  const [selectedFieldsFromDisplayHandling, setSelectedFieldsFromDisplayHandling] = useState([]);

  // Handle file selection and set parsed data
  const handleFileSelect = (data) => {
    // Set the parsed data directly without any filtering
    setParsedData(data);
  };

  const handleNext = (fields) => {
    setSelectedFieldsFromDisplayHandling(fields);
    // No need to filter data here if you want to display all parsed data
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<>
            <FileSelection onFileSelect={handleFileSelect} />
            <SpecifyFormat />
            <DisplayHandling onNext={handleNext} initialSelectedFields={selectedFieldsFromDisplayHandling} />
          </>} />

          {/* Directly pass parsedData to DataDisplayPage */}
          <Route 
  path="/datatable" 
  element={<DataDisplayPage parsedData={parsedData} selectedFields={selectedFieldsFromDisplayHandling} />} 
/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
