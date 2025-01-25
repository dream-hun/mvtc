import { PropsWithChildren } from "react";

export default function RegistrationLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative bg-gray-50 overflow-hidden">
            <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
                <div className="relative h-full max-w-7xl mx-auto">
                    <svg className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
                        width="404" height="784" fill="none" viewBox="0 0 404 784">
                        <defs>
                            <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20"
                                patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" className="text-red-600" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="404" height="784" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
                    </svg>
                    <svg className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
                        width="404" height="784" fill="none" viewBox="0 0 404 784">
                        <defs>
                            <pattern id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b" x="0" y="0" width="20" height="20"
                                patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" className="text-red-600" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
                    </svg>
                </div>
            </div>

            <div className="relative pt-6 pb-16 sm:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
                        <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                            <div className="flex items-center justify-between w-full md:w-auto">
                                <a href="">
                                    <span className="sr-only">Registration</span>
                                    <img className="h-12 w-auto sm:h-12"
                                        src="https://fmorwanda.org/wp-content/uploads/2022/10/logo.png" alt="" />
                                </a>
                            </div>
                        </div>
                    </nav>

                    <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
                        <div className="text-center">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block">Join our TVET School</span>
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-gray-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Register in Marcegaglia Vocational Training Center for March 2025 Intake, and start your
                                journey to success.
                                We accept all genders, we have accommodations for both male and female students. You can
                                also choose to take a day program.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-16 bg-white pb-16 sm:mt-24 sm:pb-24">
                    <div className="relative">
                        <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                                <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                                    <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Register for March 2025 Intake</h3>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
