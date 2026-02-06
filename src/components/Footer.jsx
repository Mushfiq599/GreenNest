export default function Footer() {
    return (
        <footer className="bg-[#0b1f14] text-white mt-10">
            <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="font-semibold">GreenNest</div>
                <div className="text-sm opacity-80">
                    Indoor Plant Care & Store — © {new Date().getFullYear()}
                </div>
            </div>
        </footer>
    );
}
