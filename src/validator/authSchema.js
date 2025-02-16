import vine from "@vinejs/vine";

const registerSchema = vine.object({
  name: vine.string().maxLength(20).minLength(2),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(20),
});

const loginSchema = vine.object({
  email: vine.string().email().required(),
  password: vine.string().minLength(8).maxLength(20).required(),
});

export { registerSchema, loginSchema };
