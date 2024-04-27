export function Results({ results }) {
  return (
    <div className="text-white">
      {results.map((result) => (
        <div key={result.id}>
          <h3>{result.title || result.name}</h3>
          <p>{result.overview}</p>
        </div>
      ))}
    </div>
  );
}
