import React from 'react';
import {useAuth} from '../../../context/Authentication';
import ExamsParent from './Exams.parent';
import ExamsStudent from './Exams.student';
import ExamsTeacher from './Exams.teacher';
export default function Exams() {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <ExamsParent />;
      break;

    case 'student':
      return <ExamsStudent />;
      break;

    case 'teacher':
      return <ExamsTeacher />;
      break;
  }
}
