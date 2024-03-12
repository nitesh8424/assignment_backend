const yup = require('yup');

exports.validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers,
            files: req.files,
            ...req.body, 
        });
        return next();
    } catch (err) {
        return res.status(400).json({ success: false, type: err.name, message: err.message });
    }
};


  exports.createUserValidation = yup.object({
    body: yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
        mobileNumber: yup.number().required().test('len', 'Mobile number must be exactly 10 digits', val => String(val).length === 10),
        email: yup.string().email().required(),
    }),
});

exports.createAdminValidation = yup.object({
    body: yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
        role: yup.string().required().oneOf(['admin'], 'Role must be "admin"'),
    }),
});


exports.createUserGroup = yup.object({
    body: yup.object({
        username: yup.string().required(),
        groupName: yup.string().required(),
        members: yup.array().of(yup.object().required()).min(1, 'At least two member objects are required').required(),
    }),
});