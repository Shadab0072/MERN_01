const {z} = require("zod");

const loginSchema =z.object({
    email: z
    .string({required_error: "Name is required"})
    .trim().email("invalid email address")
    .min(3,{ message: "email minimum be 3 chars"})
    .max(20,{ message: "email max be 30 chars"}),
    
    password: z
    .string({required_error: "pwd is required"})
    .min(6,{ message: "pwd minimum be 6 chars"})
    .max(20,{ message: "pwd max be 20 chars"}),
})


const signupSchema = loginSchema.extend({
username: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3,{ message: " Name minimum be 3 chars"})
    .max(20,{ message: " Name max be 20 chars"}),

phone: z
    .string({required_error: "phone is required"})
    .trim()
    .min(10,{ message: " number minimum be 10 chars"})
    .max(12,{ message: "number max be 12 chars"}),

})
module.exports = { signupSchema, loginSchema };