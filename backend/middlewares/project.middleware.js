import joi from "joi";

export const createProjectMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(3).max(50).trim().pattern(/^[A-Za-z0-9_]+$/).required(),
            projectLanguage: joi.string().valid("Python", "Java", "Cpp", "JavaScript", "C", "go", "bash").required(),
            code: joi.string().optional().empty("")
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

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};

export const updateCodeMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            code: joi.string().required()
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

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
}

export const updateProjectNameMiddleware = async (req, res, next) => {
    try {
        try {
            const schema = joi.object({
                name: joi.string().min(3).max(50).trim().pattern(/^[A-Za-z0-9_]+$/).required(),
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

        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
        };
    } catch (error) {

    }
}