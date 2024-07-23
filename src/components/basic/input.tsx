import { InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function Input({
    className,
    ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
    const { pending } = useFormStatus();
    return (
        <input disabled={pending} className={className + " p-1"} {...rest} />
    );
    //
}
