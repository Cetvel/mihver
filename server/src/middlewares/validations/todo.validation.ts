import { body, ValidationChain } from 'express-validator';


const createTodo: ValidationChain[] = [
    body('title').notEmpty().isString().isLength({ min: 2, max: 255 }),
    body('description').optional().isString().isLength({ min: 3, max: 255 }),
    body('tag').notEmpty().isString(),
]

const updateTodo: ValidationChain[] = [
    body('title').optional().isString().isLength({ min: 3, max: 255 }),
    body('description').optional().isString().isLength({ min: 3, max: 255 }),
    body('tag').optional().isString().isLength({ min: 3, max: 255 }),
    body('status').optional().isString().isIn(['incomplete', 'in-progress', 'completed']),
]



export default {
    createTodo,
    updateTodo
}