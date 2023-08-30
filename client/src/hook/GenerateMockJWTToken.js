import jwt from "jsonwebtoken";

export const GenerateMockJWTToken = () => {
  const payload = {
    userId: "admin",
    username: "admin_user",
    role: "admin",
  };

  const secretKey = "your-secret-key";
  const options = {
    expiresIn: "1h", // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};
