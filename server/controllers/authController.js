const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync((req, res, next) => {
    return res.status(200).json({
      success: true,
      message: `Signed up successfully as ${req.user.email}`,
      data: req.user,
    });
});

exports.login = catchAsync((req, res, next) => {
  return res.status(200).json({
    success: true,
    message: `Logged in successfully as ${req.user.email}`,
    data: req.user,
  });
});


exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
