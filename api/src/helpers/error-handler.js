export function invalidInput(message = 'Invalid input') {
    const err = new Error(message);
    err.status = 400;
    return err;
}

export function invalidPassword(message = 'Invalid password') {
    const err = new Error(message);
    err.status = 401;
    return err;
}

export function invalidUsername(message = 'Invalid user name') {
    const err = new Error(message);
    err.status = 401;
    return err;
}

export function invalidRole() {
    const err = new Error('This user has no permission');
    err.status = 403;
    return err;
}
