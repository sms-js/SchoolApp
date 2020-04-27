import React from 'react';
import {useAuth} from '../../../context/Authentication';
import HomeParent from './Home.parent';
import HomeStudent from './Home.student';
import HomeTeacher from './Home.teacher';
export default function Home(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <HomeParent properties={props} />;
      break;

    case 'student':
      return <HomeStudent properties={props} />;
      break;

    case 'teacher':
      return <HomeTeacher properties={props} />;
      break;
  }
}
