const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthServices {
    static async authenticate (credentials) {
        try {
            const {username, password} = credentials;
            const result = await User.findOne({
                where: {username}
            });
            if(result){
                const isValid = bcrypt.compareSync(password, result.password);
                return isValid ? {isValid, result} : isValid
            } else{
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    static generateToken(data){
        try {
            const token = jwt.sign(data, process.env.JWT_SECRET, {
                expiresIn: '5m',
                algorithm: 'HS512',
            });
            return token
        } catch (error) {
            throw error;
        }
    }
}


module.exports = AuthServices;