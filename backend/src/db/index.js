import mongoose  from "mongoose";

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`,
             {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    }catch(err){
        console.log("Error to connect to DB", err );
        process.exit(1);
    }
}

export default connectDB