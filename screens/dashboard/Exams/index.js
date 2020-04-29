import React from 'react';
import {useAuth} from '../../../context/Authentication';
import UserExams from './Exams.user';
import TeacherExams from './Exams.teacher';
export default function Exams(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <UserExams properties={props} />;
      break;

    case 'student':
      return <UserExams properties={props} />;
      break;

    case 'teacher':
      return <TeacherExams properties={props} />;
      break;
  }
}
