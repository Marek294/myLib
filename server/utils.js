import jwt from 'jsonwebtoken';

export const generateJWT = (user) => {
    return jwt.sign({
        email: user.get('email'),
        confirmed: user.get('confirmed')
    }, process.env.JWT_SECRET );
}

export const toAuthJSON = (user, token) => {
    return {
        email: user.get('email'),
        confirmed: user.get('confirmed'),
        token
    }
}