'use client';
import { useAutosave } from 'react-autosave';

import { useState } from 'react';
import { updateEntry } from '@/utils/api';

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  useAutosave({
    data: value,
    interval: 2000,
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, { content: _value });
      setIsLoading(false);
    },
  });

  return (
    <div className="h-full w-full">
      {isLoading && '...loading'}
      <textarea
        className="h-full w-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
