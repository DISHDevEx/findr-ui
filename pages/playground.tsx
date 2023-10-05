import React, { useState } from 'react';
import { title } from '../components/primitives';
import { fetchGraphQL } from './api/api';

export default function PlaygroundPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const handleResponseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(event.target.value);
  };

  const handleApiCall = async () => {
    try {
      const data = await fetchGraphQL(query);
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
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
