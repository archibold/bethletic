import { InputHTMLAttributes } from "react";

export default function Input({
    className,
    ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
    return <input {...rest} className={className + " p-1"} />;
    //
}
