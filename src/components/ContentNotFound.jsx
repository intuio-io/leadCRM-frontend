const ContentNotFound = () => {
    return (
        <>
            <div className="pb-4 md:ml-48 font-error bg-white rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  m-auto -mt-52 md:-mt-48 mx-4 md:mx-0">
                <section className="flex items-center h-full p-16">
                    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                        <div className="max-w-md text-center">
                            <h2 className="mb-8  text-9xl text-slate-700">
                                <span className="sr-only">Error</span>404
                            </h2>
                            <a
                                rel="noopener noreferrer"
                                href="/dashboard"
                                className="px-8 py-3 font-semibold rounded bg-indigo-500 text-white"
                            >
                                Back to homepage
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ContentNotFound;
