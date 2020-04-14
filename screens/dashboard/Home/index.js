import React from 'react';
import {useAuth} from '../../../context/Authentication';
import HomeParent from './Home.parent';
import HomeStudent from './Home.student';
import HomeTeacher from './Home.teacher';
export default function HomeExample() {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <HomeParent />;
      break;

    case 'student':
      return <HomeStudent />;
      break;

    case 'teacher':
      return <HomeTeacher />;
      break;
  }
}
