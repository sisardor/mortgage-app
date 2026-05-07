'use client'
import Spinner from "../Spinner";
import "./ApplicationsList.css";

const ApplicationsList = ({ applicants = [], onEdit, isLoading }:
    {
        applicants: any;
        onEdit: Function;
        isLoading: boolean;
    }
) => {

    return (
        <div className="flex justify-center">
            <div className="border border-gray-400 w-full sm:w-[80%]">
                <table className="" style={{width: '100%', position: 'relative'}}>
                    <thead>
                        <tr className="border-b border-gray-400 text-left">
                            <th className="px-2 sm:px-4 py-2 font-semibold">Name</th>
                            <th className="px-2 sm:px-4 py-2 font-semibold">Email</th>
                            <th className="px-2 sm:px-4 py-2 font-semibold">Phone</th>
                            <th className="px-2 sm:px-4 py-2 font-semibold">Product</th>
                            <th className="px-2 sm:px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {(isLoading) && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-10 text-gray-500"
                                >
                                    <div className="text-center">
                                        <Spinner />
                                    </div>
                                </td>
                            </tr>
                        )}

                        {applicants.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-10 text-gray-500"
                                >
                                    {/* No applications found */}
                                </td>
                            </tr>
                        ) : (
                            applicants.map((app: any, index: number) => (
                                <tr
                                    key={app.id || index}
                                    className="applicant-tr border-b border-gray-300 last:border-none"
                                >
                                    <td className="px-2 sm:px-4 py-2">{app.applicant.firstName} {app.applicant.lastName}</td>
                                    <td className="px-2 sm:px-4 py-2">{app.applicant.email}</td>
                                    <td className="px-2 sm:px-4 py-2">{app.applicant.phone}</td>                                    
                                    <td className="px-2 sm:px-4 py-2">{app.product.name}</td>

                                    <td className="px-2 sm:px-4 py-2">
                                        <button
                                            onClick={() => onEdit?.(app)}
                                            className="px-2 border border-gray-500 rounded-full hover:bg-gray-100 transition"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsList;