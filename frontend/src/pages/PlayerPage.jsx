import { useParams } from 'react-router-dom';

export default function PlayerPage() {
  const { id } = useParams(); // extracts the ':id' from the URL

  return (
    <div>
      <h1>Player Details</h1>
      <p>Player ID: {id}</p>
    </div>
  );
}