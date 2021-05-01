const {config}=require('../../config/index')
const boom=require('@hapi/boom')
const Sentry = require("@sentry/node");


//Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}` });
//console.log(sentryDns);
function logErrors(err,req,res,next) {
   // Sentry.captureException(err);

    console.log(err.stack);
    next(err)
}


function clientErrorHandler(err,req,res,next) {
    if(req.xhr){
        res.status(500).json({err:err.message})

    }
    else{
        next(err)
    }
}

function errorHandler(err,req,res,next) {
    if(req.headersSent){
        next(err)
    }
    if(!config.dev){
        delete err.stack
    }
    res.status(err.status||500)
    res.render('error',{error:err})
}

module.exports={
    logErrors,
    clientErrorHandler,
    errorHandler
}