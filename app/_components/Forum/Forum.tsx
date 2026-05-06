import { Applicant } from "@/app/_types/Applicant";
import { useState } from "react";

type ErrorType = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}

const Forum = ({ onSubmit, applicant }:
    {
        onSubmit: Function;
        applicant?: Applicant
    }
) => {

    const emptyData = {
        firstName:  "",
        lastName:  "",
        email:  "",
        phone:  "",
    }
    
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState(applicant || emptyData);
    const [errors, setErrors] = useState<ErrorType>({});
    const [submittedData, setSubmittedData] = useState<Applicant | null>(null);

    const validate = () => {
        const newErrors: ErrorType = {};

        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        if (!form.phone.trim()) newErrors.phone = "Phone is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        if (!validate()) {
            return;
        }
        setIsLoading(true);
        setSubmittedData(form);
        
        if (await onSubmit(form)) {
            setIsLoading(false);
        }
    };

    return (
        <div className="m-8 border border-gray-300 rounded-2xl p-8 bg-white shadow-sm">
            <h2 className="mb-6 text-lg font-semibold">
                Main applicant information
            </h2>

            <div className="space-y-5">

                <div className="md:grid md:grid-cols-5 md:items-center gap-4 ">
                    <label className="text-sm font-medium" htmlFor="firstName">First name</label>
                    <div className="col-span-2">
                        <input
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-2">
                        {errors.firstName && (<p className="text-red-500 text-sm mt-1">{errors.firstName}</p>)}
                    </div>
                </div>

                <div className="md:grid md:grid-cols-5 md:items-center gap-4">
                    <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
                    <div className="col-span-2">
                        <input
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-2"> 
                        {errors.lastName && (<p className="text-red-500 text-sm mt-1">{errors.lastName}</p>)}
                    </div>
                </div>


                <div className="md:grid md:grid-cols-5 md:items-center gap-4">
                    <label className="text-sm font-medium" htmlFor="email">Email</label>
                    <div className="col-span-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-2">
                        {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}
                    </div>
                </div>


                <div className="md:grid md:grid-cols-5 md:items-center gap-4">
                    <label className="text-sm font-medium" htmlFor="phone">Phone</label>
                    <div className="col-span-2">
                        <input
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-2"> 
                        {errors.phone && (<p className="text-red-500 text-sm mt-1">{errors.phone}</p>)}
                    </div>
                </div>
            </div>


            <button
                onClick={handleSave}
                className="inline-flex border-gray-400 items-center mt-8 border rounded-xl py-3 px-6 hover:bg-gray-50"
            >
                {(isLoading) && (
                    <>
                        <svg aria-hidden="true" className="w-4 h-4 text-neutral-tertiary animate-spin fill-brand me-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        Loading...
                    </>
                )}
                {(!isLoading) && (<>Save applicant info</>)}
            </button>
            
        </div>
    );
};

export default Forum;