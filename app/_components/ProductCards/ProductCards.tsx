'use client'
import { useState, useEffect } from 'react';
import { getProducts, createApplication } from "@/app/_services/product.service";
import { Product } from '@/app/_types/Product';
import Card from '../Card';
import { useRouter } from 'next/navigation'
import Spinner from '../Spinner';


const ProductCard = ({ }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [fixedRateProduct, setFixedRateProduct] = useState<Product[]>([]);
    const [variableRateProduct, setVariableRateProduct] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(data => {
            const fixed = data.filter(item => item.type === 'FIXED').sort((a, b) => a.bestRate - b.bestRate);
            const variable = data.filter(item => item.type === 'VARIABLE').sort((a, b) => a.bestRate - b.bestRate);
            setFixedRateProduct(fixed);
            setVariableRateProduct(variable);
        }).catch(console.error);
    }, []);

    const selectProduct = (id: any) => {
        setIsLoading(true);
        setSelectedProduct(id);

        createApplication(id).then(data => {
            setIsLoading(false);
            setSelectedProduct(null);

            router.push(`/applications/${data.id}`)
        }).catch(console.error);
    }

    const cards = fixedRateProduct.map((product, index) => {
        return <Card
            isLoading={isLoading}
            selectedProduct={selectedProduct}
            key={product.id}
            product={product}
            isBestRate={index === 0}
            onClick={() => selectProduct(product.id)}
        />;
    });

    const cardsVariable = variableRateProduct.map((product, index) => {
        return <Card
            isLoading={isLoading}
            selectedProduct={selectedProduct}
            key={product.id}
            product={product}
            isBestRate={index === 0}
            onClick={() => selectProduct(product.id)}
        />;
    });

    return (
        <div className='sm:flex sm:flex-row justify-center sm:-mt-8'>
            {(cards && cards.length === 0) && (<Spinner />)}
            <div className="">
                {cards}
            </div>

            <div className="">
                {cardsVariable}
            </div>

        </div>
    );
};

export default ProductCard;