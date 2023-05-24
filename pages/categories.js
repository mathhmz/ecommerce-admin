import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [name,setName] = useState('');
    const [categories,setCategories] = useState([])
    useEffect(() => {
    fetchCategories();
    }, [])


    function fetchCategories(){
        axios.get('/api/categories')
        .then(result => setCategories(result.data)  )
    }

    async function saveCategory(ev) {
        ev.preventDefault()
        await axios.post('/api/categories',{name});
        setName('');
        fetchCategories();
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
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Nome da categoria</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(categories => (
                        <tr key={categories.id}>
                            <td>{categories.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}