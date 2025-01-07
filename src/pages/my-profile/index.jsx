import useMyProfileModel from './my-profile.model';
import MyProfileView from './my-profile.view';

export default function MyProfilePage() {
  const methods = useMyProfileModel();

  return <MyProfileView {...methods} />;
}
