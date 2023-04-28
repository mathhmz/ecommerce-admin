import Layout from "@/components/Layout";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { Router, useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct(){

    const [title,setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const[goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()
    async function createProduct(event){
        event.preventDefault()
        const data = {title, description, price}
        await axios.post("/api/products", data)
        setGoToProducts(true)
    }

    if(goToProducts){
        router.push("/products")
    }
    return(
        <Layout>
            <form onSubmit={createProduct}>
                <h1>Novo Produto</h1>
                <label>Nome do produto</label>
                <input type="text" placeholder="Apple iPhone 14"
                    value={title} onChange={ev => setTitle(ev.target.value)}></input>
                <label>Informacoes do produto</label>
                <textarea placeholder="O Apple iPhone 14 é um smartphone iOS com características inovadoras que o tornam uma excelente opção para qualquer tipo de utilização."
                    value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
                <label>Valor do produto(Em BRL)</label>
                <input type="number" placeholder="R$ 5.174,00"
                    value={price} onChange={ev => setPrice(ev.target.value)}></input>
                <button type="submit" className="btn-primary">Salvar produto</button>
            </form>

        </Layout>
    )
}