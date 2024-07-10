"use client";

import { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type ButtonAttibutes = ButtonHTMLAttributes<HTMLButtonElement> & {
    warning?: Boolean;
};
export default function Button(props: ButtonAttibutes) {
    return (
        <button
            {...props}
            className={clsx(
                props.warning
                    ? "bg-red-300 hover:bg-red-200 active:bg-red-400"
                    : "bg-gray-200 hover:bg-gray-100 active:bg-gray-300",
                " px-4 py-2 border-2"
            )}
        >
            {props.children}
        </button>
    );
    //
}
