import React from 'react';
import {useAuth} from '../../../context/Authentication';
import AttendanceParent from './Attendance.parent';
import AttendanceStudent from './Attendance.student';
import AttendanceTeacher from './Attendance.teacher';
export default function Attendance(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <AttendanceParent properties={props} />;
      break;

    case 'student':
      return <AttendanceStudent properties={props} />;
      break;

    case 'teacher':
      return <AttendanceTeacher properties={props} />;
      break;
  }
}
