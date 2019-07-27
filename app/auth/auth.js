// module.exports = async (req, res, next)=>{
//     const authHeader = req.get('Authorization');
//     if (!authHeader) {
//         console.log("no cookie");
//         return next();
//     }
//     if (!authHeader || authHeader === "") {
//         return next();
//     }
//     const accessToken = authHeader.split(' ')[1];
//     let decodedToken;
// }