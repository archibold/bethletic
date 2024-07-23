import { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { useFormStatus } from "react-dom";

type ButtonAttibutes = ButtonHTMLAttributes<HTMLButtonElement> & {
    warning?: Boolean;
};

export default function Button({
    children,
    warning,
    className,
    ...rest
}: ButtonAttibutes) {
    const { pending } = useFormStatus();
    return (
        <button
            disabled={pending}
            className={clsx(
                warning
                    ? "bg-red-300 hover:bg-red-200 active:bg-red-400"
                    : "bg-gray-200 hover:bg-gray-100 active:bg-gray-300",
                " px-4 py-2 border-2 disabled:cursor-not-allowed disabled:bg-gray-500",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
    //
}
