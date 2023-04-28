import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect } from "react";

export default function EditProductPage(){
    const router = useRouter();
    const id = router.query.id;
    useEffect(() => {

        if(!id){
            return
        }
        axios.get('/api/products?id=' + id).then(response =>{
            console.log(response.data);
        
        })
    }, [id])
    return(
        <Layout>
            edit product form here
        </Layout>
    )
}