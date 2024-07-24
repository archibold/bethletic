import clsx from "clsx";
import { ReactNode } from "react";

export default function Modal({
    children,
    isOpen,
    onClose,
}: {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <div className={clsx(isOpen ? "absolute inset-0" : "hidden")}>
            <div className="w-screen h-screen items-center justify-center flex bg-black bg-opacity-80">
                <div className="bg-white p-5 flex flex-col">
                    <button className="w-5 ml-auto" onClick={onClose}>
                        x
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
}
