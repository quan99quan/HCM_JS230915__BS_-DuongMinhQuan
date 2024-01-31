import { Request, Response } from 'express'
import { todoModel } from '../models/todo.model'
export const todoController = {
    create: async (req: Request, res: Response) => {
        try {
            const { status, data, message } = await todoModel.create(req.body);
            if (status) {
                return res.status(200).json({
                    message,
                    data,
                })
            } else {
                throw {
                    message,
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: (err as Error).message || 'Server Out',
            })
        }
    },
    findAll: async (req: Request, res: Response) => {
        try {
            let { data, message, status } = await todoModel.findAll();
            if (status) {
                return res.status(200).json({
                    message,
                    data,
                })
            } else {
                throw {
                    message,
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: (err as Error).message || 'Server Out',
            })
        }
    },
    edit: async (req: Request, res: Response) => {
        try {
            const Id = parseInt(req.params.id)
            const { data, message, status } = await todoModel.edit(Id, req.body);
            if (status) {
                return res.status(200).json({
                    message,
                    data,
                })
            } else {
                throw {
                    message,
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: (err as Error).message || 'Server Out',
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const Id = parseInt(req.params.id)
            const { data, message, status } = await todoModel.delete(Id);
            if (status) {
                return res.status(200).json({
                    message,
                    data,
                });
            } else {
                throw {
                    message,
                };
            }
        } catch (err) {
            return res.status(500).json({
                message: (err as Error).message || 'Server Out',
            })
        }
    },
}