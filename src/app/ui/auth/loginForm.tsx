"use client";

import Input from "@/app/ui/basic/input";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
    const { pending } = useFormStatus();
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch}>
            <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
                <Input autoFocus name="email" placeholder="type email... " />
                <Input
                    name="password"
                    placeholder="type password"
                    type="password"
                />
                <button disabled={pending} className="text-right">
                    Login
                </button>
                <Link className="text-right" href="/auth/register">
                    <small>Register</small>
                </Link>
            </div>
        </form>
    );
}
