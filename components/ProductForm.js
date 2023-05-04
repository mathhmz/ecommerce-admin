
import Layout from "@/components/Layout";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { Router, useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({title: existingTitle, description: existingDescription, price: existingPrice, _id:existingId, images:existingImages}) { 
    const [images,setImages] = useState(existingImages || []) 
    const [title,setTitle] = useState(existingTitle || "")
    const [description, setDescription] = useState(existingDescription ||"" )
    const [price, setPrice] = useState(existingPrice ||"")
    const [_id, setId] = useState(existingId ||"")
    const[goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()
    async function saveProduct(event){
        event.preventDefault()
        const data = {images,title, description, price}
        if(_id){
            await axios.put('/api/products', {...data,_id});
        }
        else{

            await axios.post("/api/products", data)
            
        }
        setGoToProducts(true)

        

    }


    if(goToProducts){
        router.push("/products")
    }

    async function uploadImages(ev){
        const files = ev.target?.files;
        if(files.length > 0){
            const data = new FormData()


            for(const file of files){
                data.append('file', file);
            }

            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return[...oldImages, ...res.data.links]
            })                
        }


    }


    return(

            <form onSubmit={saveProduct}>
                <label>Nome do produto</label>
                <input type="text" placeholder="Apple iPhone 14"
                    value={title} onChange={ev => setTitle(ev.target.value)}></input>

                <label>
                    Imagens
                </label>
                <div className="mb-2 flex flex-wrap gap-2">

                    {!!images?.length && images.map(link => (
                        <div key={link} className="h-24">
                            <img className="w-24 rounded-lg" src={link} alt="Imagem do produto"></img>
                        </div>
                    ))}
                    


                    <label on className="w-24 h-24 flex items-center justify-center rounded-lg bg-gray-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <input type="file" className="hidden" onChange={uploadImages} />
                    </label>
                    {!!images?.lenght && (
                        <div>Ainda não existem imagens para este produto</div>
                    )}
                </div>

                <label>Informacoes do produto</label>
                <textarea placeholder="O Apple iPhone 14 é um smartphone iOS com características inovadoras que o tornam uma excelente opção para qualquer tipo de utilização."
                    value={description} onChange={ev => setDescription(ev.target.value)}></textarea>


                <label>Valor do produto(Em BRL)</label>
                <input type="number" placeholder="R$ 5.174,00"
                    value={price} onChange={ev => setPrice(ev.target.value)}></input>
                <button type="submit" className="btn-primary">Salvar produto</button>
            </form>


    )
}