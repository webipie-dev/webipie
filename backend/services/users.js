const JWT = require('jsonwebtoken');
const {validateUser , User} = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
    return JWT.sign({
        iss: 'NameOfProject',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1 )
    }, JWT_SECRET );
};


module.exports = {
    signUp : async (req,res) => {
        const { error } = validateUser(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
    
        const { email,password } = req.body;

        let findUser = await User.findOne({ "local.email": email });
        if (findUser) return res.status(403).send({ error: 'Email is already in use'});
        
        findUser = await User.findOne({ 
            $or: [
              { "google.email": email },
              { "facebook.email": email },
            ] 
          });
          if (findUser) {
            // Let's merge them?
            findUser.methods.push('local')
            findUser.local = {
              email: email, 
              password: password
            }
            await findUser.save()
            // Generate the token
            const token = signToken(findUser);
            // Respond with token
            res.cookie('access_token', token, {
              httpOnly: true
            });
            res.status(200).json({ success: true });
        }
      

        const newUser = new User({ 
            methods: ['local'],
            local: {
                email: email, 
                password: password
            }
        });
        await newUser.save();
    
        const token = signToken(newUser);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        return res.send(token);
    },

    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ success: true });
    },

    googleOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ success: true });
    },

    facebookOAuth: async (req, res, next) => {
        res.status(200).json({success: true});
    }

}
