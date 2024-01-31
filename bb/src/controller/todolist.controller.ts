import taskModel from "../models/todolist.model";
import axios from 'axios';
import { Request, Response } from 'express';

interface TaskResponse {
    status: boolean;
    message?: string;
    data?: any;
}

export default {
    create: async function (req: Request, res: Response) {
        try {
            const { name } = req.body;
            let { status, message, data }: TaskResponse = await taskModel.create(name);
            console.log(status);
            if (status) {
                return res.status(200).json({
                    data,
                    message
                });
            } else {
                return res.status(500).json(message);
            }
        } catch (err) {
            console.log(err);
        }
    },

    getAlltodolist: async function (req: Request, res: Response) {
        try {
            let { status, message, data }: TaskResponse = await taskModel.getAlltodolist();
            if (status) {
                return res.status(200).json(data);
            } else {
                return res.status(500).json({ message });
            }
        } catch (err) {
            console.log('Error fetching todolists:', err);
        }
    },

    gettodolistById: async function (req: Request, res: Response) {
        try {
          let { status, message, data }: TaskResponse = await taskModel.gettodolistById(req.params.id);
          if (status) {
            return res.status(200).json(data);
          } else {
            return res.status(500).json(message);
          }
        } catch (err) {
          console.log("err", err);
        }
      },
      

    deletetodolistById: async function (req: Request, res: Response) {
        try {
            const id = req.params.id;
            let response = await taskModel.deletetodolistById(id);
            if (!response) {
              
                return res.status(500).json({ message: 'No response from taskModel' });
            }

            let { status, message, data }: TaskResponse = response;
           
            if (status) {
                return res.status(200).json(message);
            } else {
                return res.status(500).json(message);
            }
        } catch (err) {
            console.log(err);
        }
    },

    updatetodolistById: async function (req: Request, res: Response) {
        try {
            const id = req.params.id;
            const { name } = req.body;
            let response = await taskModel.updatetodolistById(id, name);
            if (!response) {
           
                return res.status(500).json({ message: 'No response from taskModel' });
            }

            let { status, message, data }: TaskResponse = response;
          
            if (status) {
                return res.status(200).json({
                    data
                });
            } else {
                return res.status(500).json(message);
            }
        } catch (err) {
            console.log(err);
        }
    },
};
