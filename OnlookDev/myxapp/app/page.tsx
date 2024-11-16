'use client';

export default function Page() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors duration-200">
            <div className="text-center text-gray-900 dark:text-gray-100 p-4">
                <h1 className="text-5xl font-semibold mb-4 tracking-tight text-[#7D3CCA]">
                    Welcome to your app
                </h1>
                <p className="text-2xl text-gray-800 dark:text-gray-300 mb-8 flex flex-col justify-center">
                    Open this page in Onlook to start
                </p>
            </div>
            <div className="w-[30px] h-[30px] bg-[#E3F3FF]"></div>
        </div>
    );
}
