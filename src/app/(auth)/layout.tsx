export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="overscroll-none w-screen h-screen items-center justify-center flex">
            {children}
        </div>
    );
}
