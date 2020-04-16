import React from 'react';
import {useAuth} from '../../../context/Authentication';
import ClassesScheduleParent from './ClassesSchedule.parent';
import ClassesScheduleStudent from './ClassesSchedule.student';
import ClassesScheduleTeacher from './ClassesSchedule.teacher';
export default function ClassesSchedule() {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <ClassesScheduleParent />;
      break;

    case 'student':
      return <ClassesScheduleStudent />;
      break;

    case 'teacher':
      return <ClassesScheduleTeacher />;
      break;
  }
}
