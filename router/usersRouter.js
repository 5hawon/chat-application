//external import
const express = require('express');
const {checks} =require('express-validator');

//inter imports
const {getUsers} =require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload =require('../middlewares/users/avatarUpload');
const {addUserValidators,addUserValidationHandler} = require('../middlewares/users/usersValidators');
const{addUser,getUser,removeUser} =require('../controller/usersController')
const {checkLogin} = require('../middlewares/common/checkLogin')


const router = express.Router();

//login page
router.get("/",decorateHtmlResponse("Users"),checkLogin,getUsers);

router.post("/",checkLogin,avatarUpload,addUserValidators,addUserValidationHandler,addUser);

//delete user
router.delete("/:id",removeUser);


module.exports = router;
