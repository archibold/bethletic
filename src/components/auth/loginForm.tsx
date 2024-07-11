"use client";

import Input from "@/components/basic/input";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { authenticate } from "@/lib/actions/auth";
import Button from "@/components/basic/button";

export default function LoginForm() {
    const { pending } = useFormStatus();
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch}>
            <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
                <div className="whitespace-pre-line">{errorMessage}</div>
                <Input autoFocus name="email" placeholder="type email... " />
                <Input
                    name="password"
                    placeholder="type password"
                    type="password"
                />
                <Button disabled={pending} className="text-right">
                    Login
                </Button>
                <Link className="text-right" href="/auth/register">
                    <small>Register new user</small>
                </Link>
            </div>
        </form>
    );
}
