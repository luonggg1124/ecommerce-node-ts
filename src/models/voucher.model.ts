import mongoose,{Document,Schema,model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface IVoucher extends Document{
    code: string;
    type: "PERCENT" | "FIXED";
    value: number;
    start_date:Date;
    end_date: Date;
}


