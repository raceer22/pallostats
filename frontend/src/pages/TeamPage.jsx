import { useParams } from 'react-router-dom';

export default function TeamPage() {
  const { id } = useParams(); // extracts the ':id' from the URL

  return (
    <div>
      <h1>Team Details</h1>
      <p>Team ID: {id}</p>
    </div>
  );
}