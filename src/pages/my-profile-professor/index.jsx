import useMyProfileProfessorModel from 'src/pages/my-profile-professor/my-profile-professor.model';
import MyProfileProfessorView from 'src/pages/my-profile-professor/my-profile-professor.view';

export default function MyProfileProfessorPage() {
  const methods = useMyProfileProfessorModel();
  return <MyProfileProfessorView {...methods} />;
}