import React from 'react';
import {useAuth} from '../../../context/Authentication';
import SubjectsParent from './Subjects.parent';
import SubjectsStudent from './Subjects.student';
import SubjectsTeacher from './Subjects.teacher';
export default function Subjects() {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <SubjectsParent />;
      break;

    case 'student':
      return <SubjectsStudent />;
      break;

    case 'teacher':
      return <SubjectsTeacher />;
      break;
  }
}
