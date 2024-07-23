"use client";

import Input from "@/components/basic/input";
import Button from "@/components/basic/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { resetPassword } from "@/lib/actions/auth/resetPassword";

import FormMessage from "../basic/formMessage";

export default function ResetPage() {
    const { pending } = useFormStatus();
    const [message, dispatch] = useFormState(resetPassword, undefined);

    return (
        <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
            <form action={dispatch}>
                <div className="flex flex-col gap-5">
                    <FormMessage message={message} />
                    <Input
                        autoFocus
                        disabled={pending}
                        name="email"
                        placeholder="type email... "
                    />
                    <Button>Reset password</Button>
                </div>
            </form>
            <Link className="text-right" href="/login">
                <small>Back to Login</small>
            </Link>
        </div>
    );
}
