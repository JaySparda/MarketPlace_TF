module.exports = (req, res, next) => {
  // Check if user is logged in first
  if (!req.user) {
    return res.status(401).json({ msg: "Not authenticated" });
  }

  // Explicitly check for admin
  if (req.user.isAdmin) {
    return next(); // User is admin, proceed
  }

  // Deny access if not admin
  res.status(403).json({ msg: "Admin access required >:(" });
};
