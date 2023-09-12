export async function fetchGraphQL(query: string) {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const { data } = await response.json();
    return data;
  }