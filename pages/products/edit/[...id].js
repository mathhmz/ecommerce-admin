import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function EditProductPage(){
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const id = router.query.id;

    useEffect(() => {

        if(!id){
            return
        }
        axios.get('/api/products?id=' + id).then(response =>{
            setProductInfo(response.data);
        
        })
    }, [id])
    return(
        <Layout>
            <h1>Edite o produto</h1>
            {productInfo == null && <p>Carregando...</p>}
            {productInfo && (<ProductForm {...productInfo}></ProductForm>)}
        </Layout>
    )
}