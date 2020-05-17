import {BASE_URL} from '../../../utils/config';

// eslint-disable-next-line no-extend-native
String.prototype.extract = function (prefix, suffix) {
  let s = this;
  var i = s.indexOf(prefix);
  if (i >= 0) {
    s = s.substring(i + prefix.length);
  } else {
    return '';
  }
  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i);
    } else {
      return '';
    }
  }
  return s;
};

export async function fetchOnlineExams(classId, studentId, date) {
  try {
    const response = await fetch(
      BASE_URL +
        '/OnlineExamsController.php' +
        '?view=get&classId=' +
        classId +
        '&studentId=' +
        studentId +
        '&date=' +
        date,
      +{
        //method: 'post',
        method: 'get',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        /*body: JSON.stringify({
        view: 'get',
        classId: classId,
        studentId: studentId,
        date: date,
      }),*/
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log('////////////////////////////////');
      //console.log(responseJson['online exams']);
      let exams = responseJson['online exams'];
      for (let i = 0; i < exams.length; i++) {
        let exam = [];
        let examQuestion = responseJson['online exams'][i]['examQuestion'];
        examQuestion = examQuestion.extract('[', ']');
        while (examQuestion != '') {
          let question = examQuestion.extract('', '}');
          question = question.extract('{', '');
          let questionText = examQuestion.extract('', ',');
          examQuestion = examQuestion.substring(question.length + 3);
          question = question.substring(questionText.length);
          questionText = questionText.substring('"title":'.length + 1);
          questionText = questionText.extract('"', '"');

          let answer1 = question.extract('', ',');
          question = question.substring(answer1.length + 1);
          answer1 = answer1.substring('"ans1":'.length);
          answer1 = answer1.extract('"', '"');

          let answer2 = question.extract('', ',');
          question = question.substring(answer2.length + 1);
          answer2 = answer2.substring('"ans2":'.length);
          answer2 = answer2.extract('"', '"');

          let answer3 = question.extract('', ',');
          question = question.substring(answer3.length + 1);
          answer3 = answer3.substring('"ans3":'.length);
          answer3 = answer3.extract('"', '"');

          let answer4 = question.extract('', ',');
          question = question.substring(answer4.length + 1);
          answer4 = answer4.substring('"ans4":'.length);
          answer4 = answer4.extract('"', '"');

          let Tanswer = question;
          question = question.substring(Tanswer.length + 1);
          Tanswer = Tanswer.substring('"Tans":'.length);
          Tanswer = Tanswer.extract('"', '"');

          exam.push({
            questionText: questionText,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            Tanswer: Tanswer,
          });
        }
        exams[i]['examQuestion'] = exam;
      }
      //console.log(exams);
      return exams;
      //return responseJson['online exams'];
    } else {
      //return 'error !';
      alert(responseJson['online exams']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchSubjectOnlineExams(
  classId,
  subjectId,
  studentId,
  date,
) {
  try {
    const response = await fetch(BASE_URL + '/OnlineExamsController2.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        classId: classId,
        subjectId: subjectId,
        studentId: studentId,
        date: date,
      }),
    });

    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['online exams']);
      let exams = responseJson['online exams'];
      for (let i = 0; i < exams.length; i++) {
        let exam = [];
        let examQuestion = responseJson['online exams'][i]['examQuestion'];
        examQuestion = examQuestion.extract('[', ']');
        while (examQuestion != '') {
          let question = examQuestion.extract('', '}');
          question = question.extract('{', '');
          let questionText = examQuestion.extract('', ',');
          examQuestion = examQuestion.substring(question.length + 3);
          question = question.substring(questionText.length);
          questionText = questionText.substring('"title":'.length + 1);
          questionText = questionText.extract('"', '"');

          let answer1 = question.extract('', ',');
          question = question.substring(answer1.length + 1);
          answer1 = answer1.substring('"ans1":'.length);
          answer1 = answer1.extract('"', '"');

          let answer2 = question.extract('', ',');
          question = question.substring(answer2.length + 1);
          answer2 = answer2.substring('"ans2":'.length);
          answer2 = answer2.extract('"', '"');

          let answer3 = question.extract('', ',');
          question = question.substring(answer3.length + 1);
          answer3 = answer3.substring('"ans3":'.length);
          answer3 = answer3.extract('"', '"');

          let answer4 = question.extract('', ',');
          question = question.substring(answer4.length + 1);
          answer4 = answer4.substring('"ans4":'.length);
          answer4 = answer4.extract('"', '"');

          let Tanswer = question;
          question = question.substring(Tanswer.length + 1);
          Tanswer = Tanswer.substring('"Tans":'.length);
          Tanswer = Tanswer.extract('"', '"');

          exam.push({
            questionText: questionText,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            Tanswer: Tanswer,
          });
        }
        exams[i]['examQuestion'] = exam;
      }
      //console.log(exams);
      return exams;
      // return responseJson['online exams'];
    } else {
      //return 'error !';
      alert(responseJson['online exams']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchTeacherOnlineExams(classId, teacherId, date) {
  try {
    const response = await fetch(
      BASE_URL + '/OnlineExamsTeacherController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'get',
          classId: classId,
          teacherId: teacherId,
          date: date,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log('////////////////////////////////');
      //console.log(responseJson['online exams']);
      let exams = responseJson['online exams'];
      for (let i = 0; i < exams.length; i++) {
        let classes = [];
        let examClass = responseJson['online exams'][i]['examClass'];
        examClass = examClass.extract('[', ']');
        while (examClass != '') {
          let classe = examClass.extract('"', '"');
          examClass = examClass.substring(classe.length + 3);
          classes.push(classe);
        }
        exams[i]['examClass'] = classes;
        let exam = [];
        let examQuestion = responseJson['online exams'][i]['examQuestion'];
        examQuestion = examQuestion.extract('[', ']');
        while (examQuestion != '') {
          let question = examQuestion.extract('', '}');
          question = question.extract('{', '');
          let questionText = examQuestion.extract('', ',');
          examQuestion = examQuestion.substring(question.length + 3);
          question = question.substring(questionText.length);
          questionText = questionText.substring('"title":'.length + 1);
          questionText = questionText.extract('"', '"');

          let answer1 = question.extract('', ',');
          question = question.substring(answer1.length + 1);
          answer1 = answer1.substring('"ans1":'.length);
          answer1 = answer1.extract('"', '"');

          let answer2 = question.extract('', ',');
          question = question.substring(answer2.length + 1);
          answer2 = answer2.substring('"ans2":'.length);
          answer2 = answer2.extract('"', '"');

          let answer3 = question.extract('', ',');
          question = question.substring(answer3.length + 1);
          answer3 = answer3.substring('"ans3":'.length);
          answer3 = answer3.extract('"', '"');

          let answer4 = question.extract('', ',');
          question = question.substring(answer4.length + 1);
          answer4 = answer4.substring('"ans4":'.length);
          answer4 = answer4.extract('"', '"');

          let Tanswer = question;
          question = question.substring(Tanswer.length + 1);
          Tanswer = Tanswer.substring('"Tans":'.length);
          Tanswer = Tanswer.extract('"', '"');

          exam.push({
            questionText: questionText,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            Tanswer: Tanswer,
          });
        }
        exams[i]['examQuestion'] = exam;
      }
      //console.log(exams);
      return exams;
      //return responseJson['online exams'];
    } else {
      //return 'error !';
      alert(responseJson['online exams']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchTeacherSubjectOnlineExams(
  classId,
  subjectId,
  teacherId,
  date,
) {
  try {
    const response = await fetch(
      BASE_URL + '/OnlineExamsTeacherController2.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'get',
          classId: classId,
          subjectId: subjectId,
          teacherId: teacherId,
          date: date,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      //console.log('////////////////////////////////');
      //console.log(responseJson['online exams']);
      let exams = responseJson['online exams'];
      for (let i = 0; i < exams.length; i++) {
        let classes = [];
        let examClass = responseJson['online exams'][i]['examClass'];
        examClass = examClass.extract('[', ']');
        while (examClass != '') {
          let classe = examClass.extract('"', '"');
          examClass = examClass.substring(classe.length + 3);
          classes.push(classe);
        }
        exams[i]['examClass'] = classes;
        let exam = [];
        let examQuestion = responseJson['online exams'][i]['examQuestion'];
        examQuestion = examQuestion.extract('[', ']');
        while (examQuestion != '') {
          let question = examQuestion.extract('', '}');
          question = question.extract('{', '');
          let questionText = examQuestion.extract('', ',');
          examQuestion = examQuestion.substring(question.length + 3);
          question = question.substring(questionText.length);
          questionText = questionText.substring('"title":'.length + 1);
          questionText = questionText.extract('"', '"');

          let answer1 = question.extract('', ',');
          question = question.substring(answer1.length + 1);
          answer1 = answer1.substring('"ans1":'.length);
          answer1 = answer1.extract('"', '"');

          let answer2 = question.extract('', ',');
          question = question.substring(answer2.length + 1);
          answer2 = answer2.substring('"ans2":'.length);
          answer2 = answer2.extract('"', '"');

          let answer3 = question.extract('', ',');
          question = question.substring(answer3.length + 1);
          answer3 = answer3.substring('"ans3":'.length);
          answer3 = answer3.extract('"', '"');

          let answer4 = question.extract('', ',');
          question = question.substring(answer4.length + 1);
          answer4 = answer4.substring('"ans4":'.length);
          answer4 = answer4.extract('"', '"');

          let Tanswer = question;
          question = question.substring(Tanswer.length + 1);
          Tanswer = Tanswer.substring('"Tans":'.length);
          Tanswer = Tanswer.extract('"', '"');

          exam.push({
            questionText: questionText,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            Tanswer: Tanswer,
          });
        }
        exams[i]['examQuestion'] = exam;
      }
      //console.log(exams);
      return exams;
      // return responseJson['online exams'];
    } else {
      //return 'error !';
      alert(responseJson['online exams']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchExamMark(examId, studentId) {
  try {
    const response = await fetch(BASE_URL + '/OnlineExamMarkController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        examId: examId,
        studentId: studentId,
      }),
    });
    const responseJson = await response.json();

    if (response.ok) {
      //console.log('////////////////////////////////');
      //console.log(responseJson['exam mark']);

      let mark = {
        grade: responseJson['exam mark'][0]['examGrade'],
        questions: [],
      };
      let examQuestionsAnswers =
        responseJson['exam mark'][0]['examQuestionsAnswers'];
      examQuestionsAnswers = examQuestionsAnswers.extract('[', ']');
      while (examQuestionsAnswers != '') {
        let question = examQuestionsAnswers.extract('', '}');
        question = question.extract('{', '');
        let questionText = examQuestionsAnswers.extract('', ',');
        examQuestionsAnswers = examQuestionsAnswers.substring(
          question.length + 3,
        );
        question = question.substring(questionText.length);
        questionText = questionText.substring('"title":'.length + 1);
        questionText = questionText.extract('"', '"');

        let answer1 = question.extract('', ',');
        question = question.substring(answer1.length + 1);
        answer1 = answer1.substring('"ans1":'.length);
        answer1 = answer1.extract('"', '"');

        let answer2 = question.extract('', ',');
        question = question.substring(answer2.length + 1);
        answer2 = answer2.substring('"ans2":'.length);
        answer2 = answer2.extract('"', '"');

        let answer3 = question.extract('', ',');
        question = question.substring(answer3.length + 1);
        answer3 = answer3.substring('"ans3":'.length);
        answer3 = answer3.extract('"', '"');

        let answer4 = question.extract('', ',');
        question = question.substring(answer4.length + 1);
        answer4 = answer4.substring('"ans4":'.length);
        answer4 = answer4.extract('"', '"');

        let Tanswer = question.extract('', ',');
        question = question.substring(Tanswer.length + 1);
        Tanswer = Tanswer.substring('"Tans":'.length);
        Tanswer = Tanswer.extract('"', '"');

        let answer = question;
        question = question.substring(answer.length);
        answer = answer.substring('"answer":'.length);
        answer = answer.extract('"', '"');

        mark['questions'].push({
          questionText: questionText,
          answers: [answer1, answer2, answer3, answer4],
          /*answer1: answer1,
          answer2: answer2,
          answer3: answer3,
          answer4: answer4,*/
          Tanswer: Tanswer,
          answer: answer,
        });
      }
      return mark;
      //return responseJson['exam mark'];
    } else {
      //return 'error !';
      alert(responseJson['exam mark']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function takeOnlineExam(
  examId,
  studentId,
  examQuestionsAnswers,
  examGrade,
  examDate,
) {
  try {
    const response = await fetch(BASE_URL + '/OnlineExamPassController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'insert',
        examId: examId,
        studentId: studentId,
        examQuestionsAnswers: examQuestionsAnswers,
        examGrade: examGrade,
        examDate: examDate,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['insert status']);
      return responseJson['insert status'];
    } else {
      //return 'error !';
      alert(responseJson['insert status']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function addOnlineExam(
  examTitle,
  examDescription,
  examClass,
  examTeacher,
  examSubject,
  examDate,
  ExamEndDate,
  examQuestion,
) {
  try {
    const response = await fetch(BASE_URL + '/OnlineExamInsertController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'insert',
        examTitle: examTitle,
        examDescription: examDescription,
        examClass: examClass,
        examTeacher: examTeacher,
        examSubject: examSubject,
        examDate: examDate,
        ExamEndDate: ExamEndDate,
        examQuestion: examQuestion,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['insert status']);
      return responseJson['insert status'];
    } else {
      //return 'error !';
      alert(responseJson['insert status']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchExamMarks(examId) {
  try {
    const response = await fetch(BASE_URL + '/OnlineExamMarksController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        examId: examId,
      }),
    });
    const responseJson = await response.json();

    if (response.ok) {
      //console.log('////////////////////////////////');
      //console.log(responseJson['exam marks']);
      let marks = [];

      for (let i = 0; i < responseJson['exam marks'].length; i++) {
        let mark = [];
        let examQuestionsAnswers =
          responseJson['exam marks'][i]['examQuestionsAnswers'];
        examQuestionsAnswers = examQuestionsAnswers.extract('[', ']');
        while (examQuestionsAnswers != '') {
          let question = examQuestionsAnswers.extract('', '}');
          question = question.extract('{', '');
          let questionText = examQuestionsAnswers.extract('', ',');
          examQuestionsAnswers = examQuestionsAnswers.substring(
            question.length + 3,
          );
          question = question.substring(questionText.length);
          questionText = questionText.substring('"title":'.length + 1);
          questionText = questionText.extract('"', '"');

          let answer1 = question.extract('', ',');
          question = question.substring(answer1.length + 1);
          answer1 = answer1.substring('"ans1":'.length);
          answer1 = answer1.extract('"', '"');

          let answer2 = question.extract('', ',');
          question = question.substring(answer2.length + 1);
          answer2 = answer2.substring('"ans2":'.length);
          answer2 = answer2.extract('"', '"');

          let answer3 = question.extract('', ',');
          question = question.substring(answer3.length + 1);
          answer3 = answer3.substring('"ans3":'.length);
          answer3 = answer3.extract('"', '"');

          let answer4 = question.extract('', ',');
          question = question.substring(answer4.length + 1);
          answer4 = answer4.substring('"ans4":'.length);
          answer4 = answer4.extract('"', '"');

          let Tanswer = question.extract('', ',');
          question = question.substring(Tanswer.length + 1);
          Tanswer = Tanswer.substring('"Tans":'.length);
          Tanswer = Tanswer.extract('"', '"');

          let answer = question;
          question = question.substring(answer.length);
          answer = answer.substring('"answer":'.length);
          answer = answer.extract('"', '"');

          mark.push({
            questionText: questionText,
            answers: [answer1, answer2, answer3, answer4],
            /*answer1: answer1,
          answer2: answer2,
          answer3: answer3,
          answer4: answer4,*/
            Tanswer: Tanswer,
            answer: answer,
          });
        }
        marks.push({
          examGrade: responseJson['exam marks'][i]['examGrade'],
          examQuestionsAnswers: mark,
          fullName: responseJson['exam marks'][i]['fullName'],
          photo: responseJson['exam marks'][i]['photo'],
        });
      }
      // console.log(marks);
      return marks;
      //return responseJson['exam marks'];
    } else {
      //return 'error !';
      return responseJson['exam marks']['error'];
    }
  } catch (error) {
    return error;
  }
}

export async function deleteOnlineExam(examId) {
  try {
    const response = await fetch(BASE_URL + '/OnlineExamDeleteController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'delete',
        examId: examId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['delete status']);
      return responseJson['delete status'];
    } else {
      //return 'error !';
      alert(responseJson['delete status']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function editOnlineExam(
  examTitle,
  examDescription,
  examClass,
  examTeacher,
  examSubject,
  examDate,
  ExamEndDate,
  examQuestion,
) {
  try {
    const response = await fetch(BASE_URL + '/OnlineExamUpdateController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'update',
        examTitle: examTitle,
        examDescription: examDescription,
        examClass: examClass,
        examTeacher: examTeacher,
        examSubject: examSubject,
        examDate: examDate,
        ExamEndDate: ExamEndDate,
        examQuestion: examQuestion,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['update status']);
      return responseJson['update status'];
    } else {
      //return 'error !';
      alert(responseJson['update status']['error']);
    }
  } catch (error) {
    return error;
  }
}
