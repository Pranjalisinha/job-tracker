import { createError } from "../utils/createError.js";


export const errorHandler = (err, req, res, next) => {
    console.log("Error encountered:", err);
    const error = createError(err.statusCode, err.message);
    return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};