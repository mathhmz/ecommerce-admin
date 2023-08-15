import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from 'react';

export default function DeleteCategoryPage(){

    const router = useRouter()
    const [CategoryInfo, setCategoryInfo] = useState()
    const {id} = router.query


    useEffect(() => {
        if(!id){
            return
        }

        axios.get('/api/categories?id=' +id).then(response => {
            setCategoryInfo(response.data);
        })
        
    }, [id])

    function goBack(){
        router.push('/categories')


        
    }

    async function deleteCategory(){
        await axios.delete('/api/categories?id=' +id);
        goBack()
    }

    return(
        <Layout>

            <div>
                <h1 className="text-center">Voce realmente deseja deletar a categoria"<span className="text-red-500">{CategoryInfo?.name}</span>" ?</h1>
                <div className="flex justify-between">
                    <button
                    onClick={deleteCategory}
                     className="btn-red">Sim</button>
                    <button className="btn-primary" onClick={goBack}>Cancelar</button>
                </div>
            </div>  

        </Layout>
    )

}