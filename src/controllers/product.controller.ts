import Product from "../models/product.model";

export const getAllProducts = async (req:Request , res:Response) => {
    try {
        const {paginate,sort,skip, limit} = req?.query;
        if(paginate){
            const data = await Product.find({}).sort(sort)
        }
    } catch (error:any) {
        
    }
}