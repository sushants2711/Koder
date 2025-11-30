import joi from "joi";

export const signupMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(5).max(30).trim().pattern(/^[A-Za-z ]+$/).required(),
            email: joi.string().email().min(11).max(50).trim().required(),
            password: joi.string().min(8).max(100).required(),
            confirmPassword: joi.string().min(8).max(100).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0]?.message
                });
        };

        next();

    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};


export const loginMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().email().min(11).max(50).trim().required(),
            password: joi.string().min(8).max(100).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0]?.message
                });
        };

        next();

    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};