module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      // res.status(500).json({
      //   error: "something went wrong",
      // });
      next();
    });
  };
};