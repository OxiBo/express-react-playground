// this does not work yet

module.exports = (req, res, next) => {
  // console.log('it is from middleware')
    if (!req.user) {
      return res.status(401).send({ error: "You must log in" });
    }
    next();
  };
  