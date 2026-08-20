import React, { useMemo } from 'react'
import { useSearchQuery, useSearchData } from "../stores/useUIStore";
import { useNavigate, Link, useParams } from 'react-router-dom';

const Home = () => {
  const searchData = useSearchData()

  const competitions = searchData.filter(item => item.type === 'competition');

  return (
    <div>
      <h1>Home</h1>
      <ul>
      {competitions.map(competition =>
        <CompetitionListItem competition={competition}/>
      )}
      </ul>
    </div>
  );
};

const CompetitionListItem = ({ competition }) => {
  return (
    <li>
      <Link to={`/competition/${competition.id}`}>
        {competition.name}
      </Link>
    </li>
  );
};

const CompetitionDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Competition Details</h2>
      <p>Viewing ID: {id}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Home
export {
  CompetitionDetail
}