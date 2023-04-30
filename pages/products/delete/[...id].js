import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from 'react';

export default function DeleteProductPage(){

    const router = useRouter()
    const [productInfo, setProductInfo] = useState()
    const {id} = router.query


    useEffect(() => {
        if(!id){
            return
        }

        axios.get('/api/products?id=' +id).then(response => {
            setProductInfo(response.data);
        })
        
    }, [id])

    console.log({productInfo})

    function goBack(){
        router.push('/products')


        
    }

    async function deleteProduct(){
        await axios.delete('/api/products?id=' +id);
        goBack()
    }

    return(
        <Layout>

            <div>
                <h1 className="text-center">Voce realmente deseja deletar o produto "<span className="text-red-500">{productInfo?.title}</span>" ?</h1>
                <div className="flex justify-between">
                    <button
                    onClick={deleteProduct}
                     className="btn-red">Sim</button>
                    <button className="btn-primary" onClick={goBack}>Cancelar</button>
                </div>
            </div>  

        </Layout>
    )

}