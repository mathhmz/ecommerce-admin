import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
    const [name,setName] = useState('');
    async function saveCategory(ev) {
        ev.preventDefault()
        await axios.post('/api/categories',{name});
        setName('');
    }
    return(
        <Layout>
            <h1>Categories</h1>

            <label>Título da categoria</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input 
                className="mb-0" 
                type="text" placeholder={'Nome da categoria'} 
                onChange={ev => setName(ev.target.value)}
                value={name} />
                <button type="submit" className="btn-primary">Salvar</button>
            </form>
        </Layout>
    )
}