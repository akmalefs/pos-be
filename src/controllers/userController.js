import { hashPassword } from "../utils/bcrypt.js";
import prisma from "../utils/prisma.js";
import { logger } from "../utils/winston.js";
import { userValidation } from "../validations/userValidation.js";

export const createUser = async (req, res) => {
  const { error, value } = userValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      result: null,
    });
  }

  try {
    const hashedPassword = await hashPassword(value.password);

    const result = await prisma.user.create({
      data: {
        name: value.name,
        username: value.username,
        password: hashedPassword,
        role: value.role,
      },
    });
    result.password = "xxxxxxxxx"; // hide password
    return res.status(200).json({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    logger.error("controllers/userController.js: createUser: " + error.message);

    return res.status(500).json({
      message: error.message,
      result: null,
    });
  }
};
