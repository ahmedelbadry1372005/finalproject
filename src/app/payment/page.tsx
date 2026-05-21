"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { shippingAddressType } from "@/types/orders.type";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { createCashOrder, createVisaOrder } from "../_actions/orders.Action";
import { cartContext } from "../_contexts/CartContextProvider";
import { toast } from "sonner";

export default function Page() {

  const {
    cartId,
    setcartItemsNum,
    settotalPriceOfCart,
    setcartProducts,
  } = useContext(cartContext) as any;

  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
      type: "",
    },
  });

  
  async function handlePayment(values: any) {
    console.log("cartId:", cartId);
    console.log(values);

   
    if (!cartId) {
      toast.error("Cart is empty or invalid", {
        position: "top-center",
      });
      return;
    }

    const userData: shippingAddressType = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
        postalCode: values.postalCode,
      },
    };

    try {
      if (values.type === "cash") {
        const cashRes = await createCashOrder(cartId, userData);

        if (cashRes?.status === "success") {
          
          setcartItemsNum(0);
          settotalPriceOfCart(0);
          setcartProducts([]);

          toast.success(cashRes.message, {
            position: "top-center",
          });
        } else {
          toast.error(cashRes.message, {
            position: "top-center",
          });
        }
      } else if (values.type === "visa") {
        const visaRes = await createVisaOrder(cartId, userData);

        console.log("VISA RES:", visaRes);

        if (visaRes?.session?.url) {
          window.open(visaRes.session.url, "_blank");
        } else {
          toast.error("Payment session failed", {
            position: "top-center",
          });
        }
      } else {
        toast.error("Please select payment method", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }

  return (
    <div className="h-screen p-5 w-6/12 mx-auto rounded-xl mt-24">
      <h1 className="text-5xl text-center my-2">Payment</h1>

      <form onSubmit={form.handleSubmit(handlePayment)}>

        
        <Controller
          name="details"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="my-2">
              <FieldLabel htmlFor={field.name}>Address Details</FieldLabel>
              <Input {...field} placeholder="Enter Your Address Details" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="my-2">
              <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
              <Input {...field} placeholder="Enter Your Phone" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        
        <Controller
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="my-2">
              <FieldLabel htmlFor={field.name}>City</FieldLabel>
              <Input {...field} placeholder="Enter Your City" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        
        <Controller
          name="postalCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="my-2">
              <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
              <Input {...field} placeholder="Enter Your Postal Code" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        
        <Controller
          name="type"
          control={form.control}
          render={({ field }) => (
            <Field className="my-2">
              <FieldLabel>Payment Method</FieldLabel>

              <label className="flex my-2 p-2 border rounded">
                <input
                  type="radio"
                  value="cash"
                  checked={field.value === "cash"}
                  onChange={field.onChange}
                />
                <span className="ml-2">Cash on Delivery</span>
              </label>

              <label className="flex my-2 p-2 border rounded">
                <input
                  type="radio"
                  value="visa"
                  checked={field.value === "visa"}
                  onChange={field.onChange}
                />
                <span className="ml-2">Pay Online (Visa)</span>
              </label>
            </Field>
          )}
        />

        <Button className="w-full p-3 my-3 bg-blue-600 text-white text-xl">
          Pay Now
        </Button>

      </form>
    </div>
  );
}