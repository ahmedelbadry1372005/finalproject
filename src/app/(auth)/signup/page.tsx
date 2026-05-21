"use client"

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from './signup.schema'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { signUpDataType } from './signup.schema'

export default function signup() {


    const router = useRouter()

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        resolver: zodResolver(signupSchema)
    })

    async function onSubmit(values :signUpDataType) {
        console.log("values", values);

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
            body: JSON.stringify(values),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const finalRes = await res.json()
        console.log("finalRes", finalRes);


        if (res.ok) {

            toast.success("Sign up successfully", {
                position: "top-center",
                richColors: true

            })

            router.replace("/login")
        } else {
            toast.error("error in sign up", {
                position: "top-center",
                richColors: true

            })
        }
    }

    return (
        <div className='border-2 p-3 w-10/12 mx-auto rounded-2xl shadow-2xl'>

            <h1 className='text-2xl my-3'>Sign Up Page</h1>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Name</FieldLabel>
                            <Input {...field} value={field.value || ""} placeholder="enter your name" />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input {...field} value={field.value || ""} placeholder="enter email" />
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Input type="password" {...field} value={field.value || ""} placeholder="enter password" />
                        </Field>
                    )}
                />

                <Controller
                    name="rePassword"
                    control={form.control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel>Confirm password</FieldLabel>
                            <Input type="password" {...field} value={field.value || ""} placeholder="Confirm password" />
                        </Field>
                    )}
                />

                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Phone</FieldLabel>
                            <Input {...field} value={field.value || ""} placeholder="enter your Phone" />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
                    Sign Up Now
                </button>

            </form>
        </div>
    )
}