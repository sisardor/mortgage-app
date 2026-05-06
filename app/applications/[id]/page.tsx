import ApplicationForum from "@/app/_components/ApplicationForum";
import { getApplication, getProducts } from "@/app/_services/product.service";
import Header from "@/app/_components/Header";

type Props = {
    params: { id: string };
};

export default async function ApplicationPage({ params }: Props) {
    const { id } = await params;

    const products = await getProducts();
    const application = await getApplication(id);

    return (
        <div className="">
            <Header />
            
            <main className="">
                <ApplicationForum id={id} products={products} application={application} />
            </main>
        </div>
    );
}