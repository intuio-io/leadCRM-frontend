import { MdCloudDone } from "react-icons/md";
import { BiSolidCubeAlt } from "react-icons/bi";
import { AiFillBug } from "react-icons/ai";

const Dashboard = () => {
    return (
        <>
            <div className="flex flex-wrap md:ml-48 rounded m-auto -mt-52 mx-4 md:mx-0">
                <div className=" md:px-2 mb-4 w-full md:w-1/2 lg:my-4  lg:w-1/3">
                    <div className="p-6 bg-white rounded-md">
                        <div className="flex justify-between items-center">
                            <div className="text-[3rem] font-dashboard text-yellow-500">
                                0
                            </div>
                            <div className="bg-yellow-100 px-3 py-3 rounded-md">
                                <BiSolidCubeAlt className="relative h-12 w-12 text-yellow-500" />
                            </div>
                        </div>
                        <p className="pt-4 text-lg tracking-wider">
                            Ingested Leads
                        </p>
                    </div>

                    <div className="bg-yellow-500 h-1.5 rounded-b-md"></div>
                </div>

                <div className="md:px-2 mb-4 w-full md:w-1/2 lg:my-4  lg:w-1/3">
                    <div className="p-6 bg-white rounded-md ">
                        <div className="flex justify-between items-center">
                            <div className="text-[3rem] font-dashboard text-indigo-500">
                                0
                            </div>
                            <div className="bg-indigo-100 px-3 py-3 rounded-md">
                                <MdCloudDone className="relative h-10 w-10 text-indigo-500" />
                            </div>
                        </div>
                        <p className="pt-4 text-lg tracking-wider">
                            Accepted Leads
                        </p>
                    </div>

                    <div className="bg-indigo-500 h-1.5 rounded-b-md"></div>
                </div>

                <div className="md:px-2 mb-4 w-full md:w-1/2 lg:my-4  lg:w-1/3">
                    <div className="p-6 bg-white rounded-md">
                        <div className="flex justify-between items-center">
                            <div className="text-[3rem] font-dashboard text-red-500">
                                0
                            </div>
                            <div className="bg-red-100 px-3 py-3 rounded-md">
                                <AiFillBug className="relative h-10 w-10 text-red-500" />
                            </div>
                        </div>
                        <p className="pt-4 text-lg tracking-wider">
                            Rejected Leads
                        </p>
                    </div>

                    <div className="bg-red-500 h-1.5 rounded-b-md"></div>
                </div>
            </div>

            <div className="mx-4 md:ml-48 rounded  m-auto mt-12 md:mx-0">
                <div>
                    <h1 className="text-xl  p-4 h-80 flex  justify-center text-md text-slate-700 tracking-wider font-bold">
                        Montly Leads
                    </h1>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
