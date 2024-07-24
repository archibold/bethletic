"use client";

import Input from "@/components/basic/input";
import Button from "@/components/basic/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { register } from "@/lib/actions/auth/registerForm";
import FormMessage from "@/components/basic/formMessage";

export default function RegisterForm() {
    const [message, dispatch] = useFormState(register, undefined);

    return (
        <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
            <form action={dispatch}>
                <div className="flex flex-col gap-5">
                    <FormMessage message={message} />
                    <Input
                        autoFocus
                        name="name"
                        placeholder="type your name... "
                    />
                    <Input
                        autoFocus
                        name="email"
                        placeholder="type email... "
                    />
                    <Input
                        name="password"
                        placeholder="type password"
                        type="password"
                    />
                    <Input
                        name="confirm-password"
                        placeholder="type the same password"
                        type="password"
                    />
                    <Button type="submit" className="text-right">
                        Register
                    </Button>
                </div>
            </form>
            {/* <div className="flex gap-5 justify-between">
                <Button>Google</Button>
                <Button>Facebook</Button>
            </div> */}
            <Link className="text-right" href="/login">
                <small>back to login page</small>
            </Link>
        </div>
    );
}
