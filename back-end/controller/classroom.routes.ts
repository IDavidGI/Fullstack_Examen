/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Classroom name.
 */
import express, { NextFunction, Request, Response } from 'express';
import classroomService from '../service/classroom.service';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new classroom
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created classroom
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       403:
 *         description: Forbidden. Only admins can create classrooms.
 */
classroomRouter.post('/', async (req: Request & { auth: any}, res: Response, next: NextFunction) => {
    try {
        const role = req.auth?.role;
        const { name } = req.body;
        const classroom = await classroomService.createClassroom(name, role);
        res.status(201).json(classroom);
    } catch (error) {
        next(error);
    }
});

export { classroomRouter };
