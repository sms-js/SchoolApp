import React from 'react';
import {useAuth} from '../../../context/Authentication';
import ExamMarksParent from './ExamMarks.parent';
import ExamMarksStudent from './ExamMarks.student';
import ExamMarksTeacher from './ExamMarks.teacher';
export default function ExamMarks(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <ExamMarksParent properties={props} />;
      break;

    case 'student':
      return <ExamMarksStudent properties={props} />;
      break;

    case 'teacher':
      return <ExamMarksTeacher properties={props} />;
      break;
  }
}
