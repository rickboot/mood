'use client';
import { askQuestion } from '@/utils/api';
import { useState } from 'react';

function Question() {
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await askQuestion(value);
    setAnswer(response);

    setValue('');
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          className="px-4 py-2 border border-black/20 rounded"
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Enter a search term"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-400 rounded-lg"
          disabled={isLoading}
        >
          Search
        </button>
        {isLoading && <div>..Loading</div>}
        {answer && <div>{answer}</div>}
      </form>
    </div>
  );
}
export default Question;
