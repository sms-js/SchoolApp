import React from 'react';
import {useAuth} from '../../../context/Authentication';
import PaymentsParent from './Payments.parent';
import PaymentsStudent from './Payments.student';
import PaymentsTeacher from './Payments.teacher';
export default function Payments(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <PaymentsParent properties={props} />;
      break;

    case 'student':
      return <PaymentsStudent properties={props} />;
      break;

    case 'teacher':
      return <PaymentsTeacher properties={props} />;
      break;
  }
}
