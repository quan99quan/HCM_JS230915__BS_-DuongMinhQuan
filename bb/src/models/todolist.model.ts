import { PrismaClient, task } from '@prisma/client';

const prisma = new PrismaClient();

interface Response<T> {
  status: boolean;
  message: string;
  data: T | null;

}

export default {
  create: async function (name: string): Promise<Response<task>> {
    try {
      const task = await prisma.task.create({
        data: {
          name: name,
        },
      });
      return {
        status: true,
        message: 'Thành công',
        data: task,
      };
    } catch (err) {
      console.log('err', err);
      let message = (err as Error).message || 'Model Error';
      return {
        status: false,
        message: message,
        data: null,
      };
    }
  },

  getAlltodolist: async function (): Promise<Response<task[]>> {
    try {
      let task = await prisma.task.findMany();
      return {
        status: true,
        message: 'ok', 
        data: task,
      };
    } catch (err) {
      console.log('Error:', err);
      let message = null;
      return {
        status: false,
        message: message ? message : 'modelError',
        data: null,
      };
    }
  },
  

  gettodolistById: async function (id: string): Promise<Response<task>> {
    try {
      let task = await prisma.task.findUnique({
        where: {
          id: Number(id),
        },
      });
      return {
        status: true,
        message: 'ok',
        data: task,
      };
    } catch (err) {
      console.log('Error model:', err);
      return {
        status: false,
        message: 'modelError',
        data: null,
      };
    }
  },

  deletetodolistById: async function (id: string): Promise<Response<task>> {
    try {
      let task = await prisma.task.delete({
        where: {
          id: Number(id), 
        },
      });
      return {
        status: true,
        message: 'ok',
        data: task,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        message: 'modelError',
        data: null,
      };
    }
  },
  

  updatetodolistById: async function (
    id: string,
    name: string
  ): Promise<Response<task>> {
    try {
      let task = await prisma.task.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
        },
      });
      return {
        status: true,
        message: 'ok',
        data: task,
      };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        message: 'modelError',
        data: null,
      };
    }
  },
};
