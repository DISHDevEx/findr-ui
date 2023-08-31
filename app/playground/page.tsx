import React, { useState, useEffect } from 'react';
import { title } from '@/components/primitives';

export default function PlaygroundPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    // This code will only run on the client-side
    // You can place any client-specific logic here
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleResponseChange = (event) => {
    setResponse(event.target.value);
  };

  const handleApiCall = () => {
    // Make your API call here using the query variable
    // and update the response state variable with the API response
    // For example:
    fetch('http:localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setResponse(data.response))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1 className={title()}>Let's Play</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="Enter query here"
        value={query}
        onChange={handleQueryChange}
      ></textarea>
      <textarea
        rows={4}
        cols={50}
        placeholder="Response will appear here"
        value={response}
        onChange={handleResponseChange}
        readOnly
      ></textarea>
      <button onClick={handleApiCall}>Boom</button>
    </div>
  );
}
