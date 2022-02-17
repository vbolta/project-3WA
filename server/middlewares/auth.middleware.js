const jwt = require("jsonwebtoken");

// JWT middleware using localStorage in client

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "Pas connecté" });

  try {
    const validToken = jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN);
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
