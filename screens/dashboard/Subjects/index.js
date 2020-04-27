import React from 'react';
import {useAuth} from '../../../context/Authentication';
import SubjectsParent from './Subjects.parent';
import SubjectsStudent from './Subjects.student';
import SubjectsTeacher from './Subjects.teacher';
export default function Subjects(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <SubjectsParent properties={props} />;
      break;

    case 'student':
      return <SubjectsStudent properties={props} />;
      break;

    case 'teacher':
      return <SubjectsTeacher properties={props} />;
      break;
  }
}
