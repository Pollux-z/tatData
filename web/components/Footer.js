import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#004a91] to-[#0059aa] text-white py-3 z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-center sm:text-left">
                        Copyright © 2023 Tourism Authority of Thailand
                    </p>
                    <div className="flex items-center gap-6">
                        <Link 
                            href="/sitemap" 
                            className="text-white/80 hover:text-white transition-colors duration-200 text-sm"
                        >
                            แผนผังเว็บไซต์
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}