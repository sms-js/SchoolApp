import React from 'react';
import {useAuth} from '../../../context/Authentication';
import ClassParent from './Class.parent';
import ClassStudent from './Class.student';
import ClassTeacher from './Class.teacher';
export default function Class() {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <ClassParent />;
      break;

    case 'student':
      return <ClassStudent />;
      break;

    case 'teacher':
      return <ClassTeacher />;
      break;
  }
}
