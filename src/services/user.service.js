const {User} = require('../models');

class UserServices {
    static async create (newUser) {
        try {
            const result = await User.create(newUser);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getAll(){
        try {
            const result = await User.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserServices;