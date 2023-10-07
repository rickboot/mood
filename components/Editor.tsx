'use client';
import { useAutosave } from 'react-autosave';
import { useState } from 'react';
import { updateEntry } from '@/utils/api';

const Editor = ({ entry }) => {
  const [text, setText] = useState(entry.content);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const [isLoading, setIsLoading] = useState(false);

  useAutosave({
    data: text,
    interval: 2000,
    onSave: async (_text: string) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, { content: _text });
      console.log('🚀 ~ file: Editor.tsx:17 ~ onSave: ~ data:', data);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });

  // useAutosave({
  //   data: text,
  //   onSave: async (_text) => {
  //     if (_text === entry.content) return;
  //     setIsLoading(true);

  //     const { data } = await updateEntry(entry.id, { content: _text });

  //     setAnalysis(data.analysis);
  //     setIsLoading(false);
  //   },
  // });

  const { summary, subject, mood, negative, color } = analysis;

  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative.toString() },
  ];

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && '...loading'}
        <textarea
          className="h-full w-full p-8 text-xl outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
                key={item.name}
              >
                <span className="text-lg font-semibold">{item.name} </span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
