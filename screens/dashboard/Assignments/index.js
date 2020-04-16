import React from 'react';
import {useAuth} from '../../../context/Authentication';
import AssignmentsParent from './Assignments.parent';
import AssignmentsStudent from './Assignments.student';
import AssignmentsTeacher from './Assignments.teacher';
export default function Assignments() {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <AssignmentsParent />;
      break;

    case 'student':
      return <AssignmentsStudent />;
      break;

    case 'teacher':
      return <AssignmentsTeacher />;
      break;
  }
}
