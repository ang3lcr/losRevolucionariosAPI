const {AuthServices} = require('../services');
const userLogin = async (req, res, next) => {
    try {
      const credentials = req.body;
      const result = await AuthServices.authenticate(credentials);  
      if(result) {
        const { username, email, id } = result.result.dataValues;
        const user = {username, email, id};
        const token = AuthServices.generateToken(user);
        user.token = token;        
        res.json({...user})
    } else {
        res.status(400).json({ message: 'Invalid data' });
    }

    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: 'Email or password invalid'
        })
    }
}

module.exports = {userLogin};