import React, { useEffect } from 'react';

const FetchTodo = () => {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json));
      
  }, []);

  return <div>Check the console for fetched data!</div>;
};

export default FetchTodo;
