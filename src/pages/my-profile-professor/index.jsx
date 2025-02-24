import useMyProfileProfessorModel from './my-profile-professor.model';
import MyProfileProfessorView from './my-profile-professor.view';

export default function MyProfileProfessorPage() {
  const methods = useMyProfileProfessorModel();
  return <MyProfileProfessorView {...methods} />;
}