"use client"

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { loginSchema } from './login.schema'
import { loginDateType } from './login.schema'
import { signIn } from 'next-auth/react'

export default function Login() {

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  async function onSubmit(values: loginDateType) {
    console.log("values", values);

    
    const res = await signIn("credentials", {
      ...values,
      redirect: false,  
    })

    console.log("SIGNIN RES:", res)

    if (res?.ok) {
      toast.success("Login success", { position: "top-center" })
      router.push("/")
    } else {
      toast.error("Login failed", { position: "top-center" })
    }
  }

  return (
    <div className='border-2 p-3 w-10/12 mx-auto rounded-2xl shadow-2xl '>

      <h1 className='text-2xl my-3'>Sign In Page</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

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

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Sign In Now
        </button>

      </form>
    </div>
  )
}