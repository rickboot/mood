const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const createEntry = async () => {
  const response = await fetch(new Request(createUrl('/api/journal')), {
    method: 'POST',
  });

  if (response.ok) {
    const data = await response.json();

    return data.data;
  }
};

export const updateEntry = async (entryId, content) => {
  const response = await fetch(
    new Request(createUrl(`/api/journal/${entryId}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  );

  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};

export const askQuestion = async (question: string) => {
  const response = await fetch('/api/question', {
    method: 'POST',
    body: JSON.stringify({ question }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};
