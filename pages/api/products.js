import { Product } from "@/models/Product";
import { mongooseConnect } from "./auth/lib/mongoose";

export default async function handle(req, res){
    const { method } = req;
    await mongooseConnect();

    if(method === "GET"){

        if(req.query?.id){
            res.json(await Product.findOne({_id: req.query.id}))
        }
        else{
            res.json(await Product.find())
        }
    }
    if (method === "POST"){
        const {title, description, price, images} = req.body
        const ProductDocument = await Product.create({
            title,description,price,images,
        })
        res.json(ProductDocument);
    }
    
    if(method === "PUT"){
        const {_id, title, description, price, images} = req.body
        await Product.updateOne({_id}, {title: title, description: description,price: price, images: images})
        res.json(true)

    }
    
    if(method === "DELETE"){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query?.id});
            res.json(true)
        }
    }

}
