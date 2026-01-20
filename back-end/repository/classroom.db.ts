import database from '../util/database';
import { Classroom } from '../model/classroom';

const getAllClassrooms = async (): Promise<Classroom[]> => {
    const classrooms = await database.classroom.findMany();
    return classrooms.map((c) => Classroom.from(c));
};

const createClassroom = async (name: string): Promise<Classroom> => {
    try {
        const classroomPrisma = await database.classroom.create({
            data: { name },
        });
        return Classroom.from(classroomPrisma);
    } catch (error) {
        throw error;
    }
};

export default {
    createClassroom,
    getAllClassrooms,
};
