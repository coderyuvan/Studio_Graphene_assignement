export default function SearchHistory({ history = [] }) {
  // TODO: render recent search history list
  return (
    <ul>
      {history.map((entry, i) => (
        <li key={i}>{entry.username}</li>
      ))}
    </ul>
  );
}
