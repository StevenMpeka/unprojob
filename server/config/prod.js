module.exports={
    MONGOURI:process.env.MOGOURI,
    JWT_SECRET:process.env.JWT_SECRET.replace(/\\n/gm,'\n'),
    SENDGRID_API:process.env.SENDGRID_API,
    EMAIL:process.env.EMAIL
}