import React from 'react';
import {useAuth} from '../../../context/Authentication';
import OnlineExamsParent from './OnlineExams.parent';
import OnlineExamsStudent from './OnlineExams.studentd';
import OnlineExamsTeacher from './OnlineExams.teacher';
export default function OnlineExams(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <OnlineExamsParent properties={props} />;
      break;

    case 'student':
      return <OnlineExamsStudent properties={props} />;
      break;

    case 'teacher':
      return <OnlineExamsTeacher properties={props} />;
      break;
  }
}
