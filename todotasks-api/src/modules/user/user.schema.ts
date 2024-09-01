import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Schema } from "../../types/global";

const RegisterUserBodySchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});
const CreateUserBodySchema = RegisterUserBodySchema.extend({
  salt: z.string().min(1).max(255),
});

export const UserParamsSchema = z.object({
  userId: z.string().uuid(),
});

const LoginUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const userSchema: Schema = {
  registerUser: {
    $id: "registerUser",
    ...zodToJsonSchema(
      z.object({
        body: RegisterUserBodySchema,
      })
    ),
  },

  loginUser: {
    $id: "loginUser",
    ...zodToJsonSchema(
      z.object({
        body: LoginUserBodySchema,
      })
    ),
  },
};

type RegisterUserBody = z.infer<typeof RegisterUserBodySchema>;
type CreateUserBody = z.infer<typeof CreateUserBodySchema>;
type LoginUserBody = z.infer<typeof LoginUserBodySchema>;

type UserParams = z.infer<typeof UserParamsSchema>;

export { UserParams, RegisterUserBody, CreateUserBody, LoginUserBody };
