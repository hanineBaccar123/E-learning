import React, { useEffect } from 'react';

const FetchTodo = () => {
  useEffect(() => {
    fetch('http://localhost:5001/')
      .then(response => response.json())
      .then(json => console.log(json));
      
  }, []);

  return <div>Check the console for fetched data!</div>;
};

export default FetchTodo;
