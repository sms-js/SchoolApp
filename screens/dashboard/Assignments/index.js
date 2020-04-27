import React from 'react';
import {useAuth} from '../../../context/Authentication';
import AssignmentsParent from './Assignments.parent';
import AssignmentsStudent from './Assignments.student';
import AssignmentsTeacher from './Assignments.teacher';
export default function Assignments(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <AssignmentsParent properties={props} />;
      break;

    case 'student':
      return <AssignmentsStudent properties={props} />;
      break;

    case 'teacher':
      return <AssignmentsTeacher properties={props} />;
      break;
  }
}
