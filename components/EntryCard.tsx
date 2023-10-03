const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="divide-y divide-gray-200 bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">{entry.content}</div>
      <div className="px-4 py-4">mood</div>
    </div>
  );
};

export default EntryCard;
