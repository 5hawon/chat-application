//external import
const express = require('express');

//inter imports
const {getLogin,login,logout} =require('../controller/loginController')
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const {doLoginValidationHandler,doLoginValidators} =require('../middlewares/login/loginValidators')
const { redirectLoggedIn} =require('../middlewares/common/checkLogin')



const router = express.Router();

const page_title ="Login";

//login page
router.get("/",decorateHtmlResponse("Login"), redirectLoggedIn,getLogin);

router.post(
    "/",
    decorateHtmlResponse(page_title),
    doLoginValidators,
    doLoginValidationHandler,
    login
  );

  router.delete('/',logout);


module.exports = router;
