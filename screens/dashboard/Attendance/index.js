import React from 'react';
import {useAuth} from '../../../context/Authentication';
import AttendanceParent from './Attendance.parent';
import AttendanceStudent from './Attendance.student';
import AttendanceTeacher from './Attendance.teacher';
export default function Attendance() {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <AttendanceParent />;
      break;

    case 'student':
      return <AttendanceStudent />;
      break;

    case 'teacher':
      return <AttendanceTeacher />;
      break;
  }
}
