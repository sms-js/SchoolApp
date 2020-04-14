import {useAuth} from '../../../context/Authentication';
import HomeParent from './HomeExample.parent';
import HomeStudent from './HomeExample.student';
export default function HomeExample() {
  const {user} = useAuth();

  switch (user.role) {
    case 'parent':
      return <HomeParent />;
      break;

    case 'student':
      return <HomeStudent />;
      break;
    default:
      break;
  }
}
