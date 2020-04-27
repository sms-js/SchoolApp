import React from 'react';
import {useAuth} from '../../../context/Authentication';
import ClassesScheduleParent from './ClassesSchedule.parent';
import ClassesScheduleStudent from './ClassesSchedule.student';
import ClassesScheduleTeacher from './ClassesSchedule.teacher';
export default function ClassesSchedule(props) {
  const {user} = useAuth();

  switch (user['role']) {
    case 'parent':
      return <ClassesScheduleParent properties={props} />;
      break;

    case 'student':
      return <ClassesScheduleStudent properties={props} />;
      break;

    case 'teacher':
      return <ClassesScheduleTeacher properties={props} />;
      break;
  }
}
