import React from 'react';
import {useAuth} from '../../../context/Authentication';
import ClassParent from './Class.parent';
import ClassStudent from './Class.student';
import ClassTeacher from './ClassTeacher';
export default function Class(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <ClassParent properties={props} />;
      break;

    case 'student':
      return <ClassStudent properties={props} />;
      break;

    case 'teacher':
      return <ClassTeacher properties={props} />;
      break;
  }
}
