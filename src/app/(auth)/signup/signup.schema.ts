import * as zod from "zod"

export const signupSchema = zod.object({

    name: zod.string().min(1, "enter your name"),

    email: zod.string().email("enter your email"),

    password: zod.string().regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
    ),

    rePassword: zod.string().regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
    ),

    phone: zod.string().regex(
        /^01[0125][0-9]{8}$/,
        "enter valid phone number"
    )

});

export type signUpDataType = zod.infer<typeof signupSchema>;