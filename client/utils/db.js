import mongoose, { mongo } from 'mongoose';
let isConnected=false;
export const connectToDatabase = async () => {
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('already connected')
        return;
    }

    try{
await mongoose.connect(process.env.DB,{
    dbName:"share",
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
isConnected=true;
console.log('connected dbb')
    }catch(error){
        console.log(error)
    }
    
}