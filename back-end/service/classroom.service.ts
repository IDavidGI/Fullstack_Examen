import classroomDb from '../repository/classroom.db';
import { Classroom } from '../model/classroom';
import { UnauthorizedError } from 'express-jwt';

const createClassroom = async (name: string, role: string): Promise<Classroom> => {
    if (role !== 'admin') {
        throw new UnauthorizedError('credentials_required', { message: 'Only admins can create classrooms.' });
    }

	const allClassrooms = await classroomDb.getAllClassrooms();

	const duplicate = allClassrooms.find(c => c.name.toLowerCase() === name.toLowerCase());
	if (duplicate) {
		throw new Error('Classroom already exists.');
	}
	return classroomDb.createClassroom(name);
};

export default { createClassroom };
