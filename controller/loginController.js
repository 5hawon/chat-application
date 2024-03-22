const User =require("../models/People")
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const createError = require('http-errors');

function getLogin(req, res, next) {
    res.render('index',{
        title: 'Login-Chat Application'
    })

}
async function login(req, res, next) {
    try {

        const user = await User.findOne({
            $or :[{email: req.body.username}, {mobile: req.body.username}],
        });

        if(user && user._id){
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            )
            if(isValidPassword){
                //prepare the class to genarate token
                const userObject = {
                    username: user.name,
                    mobile :user.mobile,
                    email: user.email,
                    role: "user",
                }
                //generate the token
                const token = jwt.sign(userObject, process.env.JWT_SECRET,{
                    expiresIn : process.env.JWT_EXPIRY,
                });

                //set cookie
                res.cookie(process.env.COOKIE_NAME, token,{
                    maxAge : process.env.JWT_EXPIRY,
                    httpOnly : true,
                    signed:true,

                });

                //set logged in user locals identification
                res.locals.loggedInUser = userObject;

                res.render('inbox');



            }else{
                throw createError("Login Failed Please try again");

            }
        }
        else{
            throw createError("Login Failed Please try again");


        }

        
    } catch (error) {
        res.render('inbox',{
            data :{
                username : req.body.username

            },
            errors:{
                common:{
                    msg: error.message
                }
            }
        })
        
    }
}
//logout
function logout(req, res){
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("Logged out");
}

module.exports ={
    getLogin,
    login,
    logout 
}