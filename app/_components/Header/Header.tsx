import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-300 mb-5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div>
                    <Link href="/">
                        <img
                            src="/nesto-EN_Primary.png"
                            alt="Nesto Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>
                </div>
                <nav className="text-lg font-medium">
                    <Link href="/applications"> Applications </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;