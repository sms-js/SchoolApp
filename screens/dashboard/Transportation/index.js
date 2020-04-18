import React from 'react';
import {useAuth} from '../../../context/Authentication';
import TransportationParent from './Transportation.parent';
import TransportationStudent from './Transportation.student';
import TransportationTeacher from './Transportation.teacher';
export default function Transportation() {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <TransportationParent />;
      break;

    case 'student':
      return <TransportationStudent />;
      break;

    case 'teacher':
      return <TransportationTeacher />;
      break;
  }
}
