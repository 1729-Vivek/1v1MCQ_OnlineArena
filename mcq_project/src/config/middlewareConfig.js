const rateLimit=require('express-rate-limit')
const helmet =require('helmet')

module.exports=function(app){
    app.use(helmet())


    const limiter=rateLimit({
        windowMs:15*60*1000,//15 minutes
        max:100 //limit each ip to 100 request 
    })
    app.use(limiter)

}