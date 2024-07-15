import { z } from "zod";

export const ValidateUser = z.object({
    name: z.string({
        invalid_type_error: "Please enter your name.",
    }),
    email: z
        .string({
            invalid_type_error: "Please enter an email address.",
        })
        .email({ message: "Please enter valid email address" }),
    password: z
        .string({
            invalid_type_error: "Please enter a password.",
        })
        .min(6),
});
