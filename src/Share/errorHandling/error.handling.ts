export const ERROR = {
    //system
    SYSTEM_ERROR: {
        statusCode: 500,
        message: 'System is error',
    },

    // user
    USER_NOT_FOUND: {
        statusCode: 404,
        message: 'User not found',
    },
    USERNAME_OR_PASSWORD_INCORRECT: {
        statusCode: 400,
        message: 'Username or password is incorrect',
    },
    PASSWORD_INCORRECT: {
        statusCode: 400,
        message: 'password is incorrect',
    },
    USERNAME_OR_EMAIL_EXISTED: {
        statusCode: 400,
        message: 'Username or email is exist',
    },
    USER_EXISTED: {
        statusCode: 409,
        message: 'User found',
    },
    USER_IS_DELETED: {
        statusCode: 400,
        message: 'User has been deleted',
    },
    USER_IS_VERIFIED: {
        statusCode: 400,
        message: 'This account is verify',
    },
    USER_IS_NOT_VERIFIED: {
        statusCode: 400,
        message: 'This account is not verified',
    },
    ACTIVECODE_IS_WRONG: {
        statusCode: 400,
        message: 'Acitve code is wrong',
    },
    USER_IS_ADMIN: {
        statusCode: 400,
        message: 'This user is admin',
    },
};
