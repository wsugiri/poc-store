const auth = require('./crypt');
const User = require('../models/sys/user');
const Role = require('../models/sys/role');
const UserRole = require('../models/sys/user_role');

module.exports = {
    authorize: async (req, res, next) => {
        const { headers } = req;
        const { authorization: token } = headers;

        if (!token) {
            res.status(403).send({ message: 'token_not_found' });
            return;
        }

        try {
            const decoded = auth.verify(token);
            if (!req.user) {
                const user = await User.findOne({
                    raw: true,
                    where: { username: decoded.username },
                    attributes: {
                        exclude: ['created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at']
                    }
                });

                const roles = await UserRole.findAll({ raw: true, where: { user: user.username, organization: user.organization }, attributes: ['role'] });
                user.roles = roles.map(m => m.role);

                delete user.password;
                delete user.userroles;

                req.user = user;
            }
            next();
        } catch (err) {
            err.info = 'Unauthorized';
            res.status(403).send(err);
        }
    }
};
