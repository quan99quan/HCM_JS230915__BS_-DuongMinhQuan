import { PrismaClient } from '@prisma/client';
import { todo } from '../common/interface';
const prisma = new PrismaClient();
export const todoModel = {
    create: async function (data: todo) {
        try {
            const todo = await prisma.todo.create({
                data: {
                    ...data,
                    status: "uncompleted"
                },
            });
            return {
                status: true,
                message: 'Todo created successfully',
                data: todo,
            };
        } catch (err) {
            let message = (err as Error).message || 'Failed to create todo';
            return {
                status: false,
                message: message,
                data: null,
            };
        }
    },
    findAll: async () => {
        try {
            let data = await prisma.todo.findMany();
            return {
                status: true,
                message: 'Successfully retrieved',
                data,
            };
        } catch (err) {
            return {
                status: false,
                data: null,
                message: 'Failed to retrieve',
            };
        }
    },
    edit: async (id: number, todo: todo) => {
        try {
            let data = await prisma.todo.update({
                where: {
                    id,
                },
                data: {
                    ...todo,
                    status: "completed"
                },
            });
            return {
                status: true,
                data,
                message: 'Successfully updated',
            };
        } catch (err) {
            return {
                status: false,
                data: null,
                message: 'Failed to update',
            };
        }
    },
    delete: async (id: number) => {
        try {
            let data = await prisma.todo.delete({
                where: {
                    id,
                },
            });
            return {
                status: true,
                data,
                message: 'Todo deleted',
            };
        } catch (err) {
            console.log('err', err);
            return {
                status: false,
                data: null,
                message: 'Failed to delete todo',
            };
        }
    },
};
