import React from 'react';
import './DataDisplayPage.css'; // Import the CSS file

const DataDisplayPage = ({ parsedData, selectedFields }) => {
  const uniqueSelectedFields = [...new Set(selectedFields)];

  const filteredData = parsedData.filter(row => !uniqueSelectedFields.every(field => row[field] === 'N/A'));

  if (!filteredData || filteredData.length === 0) {
    return <div className="container">No data available</div>;
  }

  return (
    <div>
      <h1 style={{textAlign:"center",color:"darkblue"}}>Product Data Display</h1>
      
    <div className="container">
      
    
      <table>
        <thead>
          <tr>
            {uniqueSelectedFields.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => {
            const rowData = uniqueSelectedFields.map(field => row[field] !== undefined ? row[field] : '');
            
            return (
              <tr key={rowIndex}>
                {rowData.map((data, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>
                    {data}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default DataDisplayPage;
