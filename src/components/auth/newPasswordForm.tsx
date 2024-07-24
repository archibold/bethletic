"use client";

import Input from "@/components/basic/input";
import Button from "@/components/basic/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import FormMessage from "@/components/basic/formMessage";
import { newPassword } from "@/lib/actions/auth/newPassword";
import { useSearchParams } from "next/navigation";

export default function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token: string | null = searchParams.get("token");
    const withTokenNewPassword = newPassword.bind(undefined, token);

    const [message, dispatch] = useFormState(withTokenNewPassword, undefined);

    return (
        <div className="border-2 border-black flex flex-col p-10 gap-5 justify-end">
            {!message?.success && (
                <form action={dispatch}>
                    <div className="flex flex-col gap-5">
                        <FormMessage message={message} />
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
                            Create new password
                        </Button>
                    </div>
                </form>
            )}
            {message?.success && (
                <div>
                    <FormMessage message={message} />
                    <Link className="text-right" href="/login">
                        <small>back to login page</small>
                    </Link>
                </div>
            )}
        </div>
    );
}
