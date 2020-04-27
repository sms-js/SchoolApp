import React from 'react';
import {useAuth} from '../../../context/Authentication';
import ExamsParent from './Exams.parent';
import ExamsStudent from './Exams.student';
import ExamsTeacher from './Exams.teacher';
export default function Exams(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <ExamsParent properties={props} />;
      break;

    case 'student':
      return <ExamsStudent properties={props} />;
      break;

    case 'teacher':
      return <ExamsTeacher properties={props} />;
      break;
  }
}
