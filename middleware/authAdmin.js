// module.exports = (req, res, next) => {
//     const userRole = req.user.role; // Assume user role is available in `req.user`
//     if (userRole !== 'Admin') {
//       return res.status(403).json({ error: 'Access denied' });
//     }
//     next();
//   };
