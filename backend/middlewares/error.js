exports.generatedErrors = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;

    if(err.name = "MongoServerError" && err.message.includes("E11000 duplicate key")){
    }
    res.status(statusCode).json({
        status:false,
        message:err.message,
        errName:err.name,
        stack:err.stack,
    })
};