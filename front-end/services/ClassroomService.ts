const createClassroom = (name: string) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  return fetch(process.env.NEXT_PUBLIC_API_URL + '/classrooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
    
  });
};

const ClassroomService = {
  createClassroom,
};

export default ClassroomService;
