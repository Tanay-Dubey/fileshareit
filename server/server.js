const express=require("express");
const path=require("path");
const app=express();
const cors=require("cors");

const port=process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use('/css', express.static(path.resolve(__dirname, "public/css")));
app.use('/image',express.static(path.resolve(__dirname,"public/image")));

const connectDB=require("./config/db");
connectDB();
 
app.use("/api/files",require("./routes/files"));
app.use("/files",require("./routes/show"));
app.use("/files/download",require("./routes/download"))

app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
});