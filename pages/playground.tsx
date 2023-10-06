import React, { useState } from 'react';
import { title } from '../components/primitives';
import { fetchGraphQL } from './api/api';

export default function PlaygroundPage() {
  /**
   * useState hook to manage the query and response states of the PlaygroundPage component.
   * query: string - the GraphQL query entered by the user.
   * setQuery: function - updates the query state.
   * response: string - the response received from the GraphQL API.
   * setResponse: function - updates the response state.
   */

  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  /**
   * Event handler function that updates the query state when the user types in the query textarea.
   * @param event - the change event triggered by the user typing in the query textarea.
   */
  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  /**
   * Event handler function that updates the response state when the user types in the response textarea.
   * @param event - the change event triggered by the user typing in the response textarea.
   */
  const handleResponseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(event.target.value);
  };

  /**
   * Event handler function that makes an API call to fetch data from the GraphQL API and updates the response state.
   */
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
