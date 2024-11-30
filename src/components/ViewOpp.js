import React, { useEffect, useState } from 'react';
import { fetchSavedData } from '../api'; // Import your API method

const ViewOpp = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchSavedData();
        if (response && Array.isArray(response)) {
          setData(response); // Set the array of questions
        } else {
          setData([]); // Set to an empty array if no valid response
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="card shadow-lg bg-base-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">View Saved Data</h1>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="quill-content mb-4"
              dangerouslySetInnerHTML={{ __html: item.question }}
            />
          ))
        ) : (
          <p>No content found</p>
        )}
      </div>
    </div>
  );
};

export default ViewOpp;
