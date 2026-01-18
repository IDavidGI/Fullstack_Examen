const getAllTeachers = () => {
  /*
    Call the back-end API on the route /teachers to get all teachers.
    You will need to implement that route in the back-end.
  */
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/teachers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateLearningPath = (teacherId: number, learningPath: string) => {
  /*
    Call the back-end API on the route /teachers/:id/learningpath to update the learning path for the teacher.
    You will need to implement that route in the back-end.
  */
  return fetch(
    process.env.NEXT_PUBLIC_API_URL + `/teachers/${teacherId}/learningpath?learningPath=${encodeURIComponent(learningPath)}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
