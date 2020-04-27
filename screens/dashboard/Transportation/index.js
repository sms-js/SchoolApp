import React from 'react';
import {useAuth} from '../../../context/Authentication';
import TransportationParent from './Transportation.parent';
import TransportationStudent from './Transportation.student';
import TransportationTeacher from './Transportation.teacher';
export default function Transportation(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <TransportationParent properties={props} />;
      break;

    case 'student':
      return <TransportationStudent properties={props} />;
      break;

    case 'teacher':
      return <TransportationTeacher properties={props} />;
      break;
  }
}
