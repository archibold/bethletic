"use client";

import Input from "@/components/basic/input";
import Button from "@/components/basic/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormField, Control, Message } from "react-hook-form";
import { z } from "zod";
import { LoginUserScheme } from "../../lib/validationSchema";
// import {FormField}
export default function LoginForm() {
    const { pending } = useFormStatus();
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const form = useForm<z.infer<typeof LoginUserScheme>>({
        resolver: zodResolver(LoginUserScheme),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
            {/* <Form {...form}> */}
            <form action={dispatch}>
                <div className="flex flex-col gap-5">
                    {/* <FormField>

                        </FormField> */}
                    <div className="whitespace-pre-line">{errorMessage}</div>
                    <Input
                        autoFocus
                        disabled={pending}
                        name="email"
                        placeholder="type email... "
                    />
                    <Input
                        name="password"
                        disabled={pending}
                        placeholder="type password"
                        type="password"
                    />
                    <Button disabled={pending} className="text-right">
                        Login
                    </Button>
                </div>
            </form>
            {/* </Form> */}
            <div className="flex gap-5 justify-between">
                <Button disabled={pending}>Google</Button>
                <Button disabled={pending}>Facebook</Button>
            </div>
            <Link className="text-right" href="/auth/register">
                <small>Register new user</small>
            </Link>
        </div>
    );
}
