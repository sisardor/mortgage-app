'use client'
import { useState } from "react";
import { updateApplication } from "@/app/_services/product.service";
import Card from "../Card";
import { Product } from '@/app/_types/Product';
import Forum from "../Forum";
import { Application } from "@/app/_types/Application";
import { Applicant } from "@/app/_types/Applicant";


const ApplicationForum = ({ id, products, application }: {
    id: number | string;
    products: Product[];
    application: Application;
}) => {
    const [showMessage, setShowMessage] = useState(false);
    const selectedProduct = products.find((item) => item.id === application.productId);


    const handleForumSubmit = async (forum: Applicant) => {
        application.applicants = [forum];
        const res = await updateApplication(application);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 1000);
        return true;
    }


    return (
        <div className="sm:flex justify-center sm:-mt-8">
            <Card product={selectedProduct} isBestRate={true} onClick={() => { }} className="h-full" />
            <Forum onSubmit={handleForumSubmit} applicant={application.applicants[0]} />
            {(showMessage) && (
                <div id="toast-bottom-right" className="fixed flex items-center duration-300 ease-out w-full max-w-xs p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default end-5 bottom-5" role="alert">
                    <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" /></svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">Saved successfully.</div>
                </div>
            )}
        </div>
    );


};

export default ApplicationForum;