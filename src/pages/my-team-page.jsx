import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MyTeamForm from 'src/sections/products/my-team-form';

export default function MyTeamPage() {
  const { teamId } = useParams(); // Obtém o ID da equipe a partir da URL

  return (
    <>
      <Helmet>
        <title> Minha Equipe </title>
      </Helmet>

      <MyTeamForm teamId={teamId ? Number(teamId) : null} /> {/* Passa o ID da equipe */}
    </>
  );
}

