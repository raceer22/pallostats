import { useParams } from 'react-router-dom';

export default function CompetitionPage() {
  const { id } = useParams(); // extracts the ':id' from the URL

  return (
    <div>
      <h1>Competition Details</h1>
      <p>Competition ID: {id}</p>
    </div>
  );
}