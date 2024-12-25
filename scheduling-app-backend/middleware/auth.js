import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ status: "error", message: "Access Denied" });

  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  try {
    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = verified; // Attach user to the request object
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // Token expired error
      return res
        .status(401)
        .json({
          status: "error",
          message: "Token has expired, please login again.",
        });
    }
    // General error (invalid token, malformed, etc.)
    res.status(400).json({ status: "error", message: "Invalid Token" });
  }
};

export default auth;
