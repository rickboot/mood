const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const res = await fetch(new Request(createUrl('/api/journal')), {
    method: 'POST',
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const updateEntry = async (entryId, content) => {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${entryId}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  );

  if (res.ok) {
    const data = await res.json();
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
