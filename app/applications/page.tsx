'use client'
import { useRouter } from 'next/navigation'
import ApplicationsList from "../_components/ApplicationsList";
import Header from "../_components/Header";
import { useState, useEffect } from 'react';
import { getApplications, getProducts } from '@/app/_services/product.service';



export default function ApplicationsPage({ }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        getProducts().then((items) => {

            const products: any = {};
            items.forEach(item => {
                products[item.id] = item  
            });
            
            getApplications().then(data => {
            
                const itemsWithApplicant: any = data
                    .map((item: any ) => {
                        return {
                            product: products[item.productId],
                            applicantId: item.id,
                            applicant: item.applicants[0]
                        }
                        
                    })
                    .filter(item => item.applicant.phone !== '' && item.applicant.email !== '' && item.applicant.firstName !== '' && item.applicant.lastName !== '')

                setApplicants(itemsWithApplicant);
                setIsLoading(false);
                
            }).catch(console.error);
        })

    }, []);

    const onApplicationSelect = (item: { applicantId: string}) => {        
        router.push(`/applications/${item.applicantId}`)
    };
    return (
        <div className="">
            <Header />
            
            <ApplicationsList applicants={applicants} onEdit={onApplicationSelect} isLoading={isLoading}/>
        </div>
    );
}