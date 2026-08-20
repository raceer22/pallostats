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
      <Link to={`/competitions/${competition.id}`}>
        {competition.name}
      </Link>
    </li>
  );
};

const LinkToHome = () => {
  return (
    <Link to={'/'}>
      Home
    </Link>
  )
}

export default Home
export {
  LinkToHome
}
