module.exports = {
    httpStatus: {
        ok: 200,
        badRequest: 400,
        notFound: 404,
        unauthorized: 401,
        forbidden: 403,
        conflict: 409,
        internalServerError: 500
    },
    messages: {
        ok: 'OK',
        unauthorized: 'Unauthorized',
        notFound: 'Not found',
        invalidToken: 'Public key not found in jwks.json',
        tokenExpired: 'Token expired',
        invalidAppClientId: 'Invalid app client id',
        tokenVerificationFailed: 'Signature verification failed',
        customerNotFound: 'Customer not found',
        vehicleNotFound: 'Vehicle not found',
        driverNotFound: 'Driver not found',
        branchNotFound: 'Cabang tidak ditemukan',
        branchCodeExist: 'Kode cabang telah terpakai',
        userNotFound: 'User ini tidak ditemukan',
        userCanNotBeEmpty: 'User ID can not be empty',
        userAlreadyExists: 'User ini sudah pernah diregister',
        prodHirarky: 'The product hierarchy is identified there is the same',
        headerExist: 'Header already exists',
        topExist: 'The submitted T.O.P combination already exists',
        clExist: 'The submitted Credit Limit combination already exists',
    }
};