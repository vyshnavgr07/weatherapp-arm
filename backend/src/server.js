const app=require('../src/app');
const env=require('dotenv');
const http=require('http')
const mongoose=require('mongoose')
env.config({path:'./.env'})
const port=process.env.PORT

const server=http.createServer(app);

mongoose.connect('mongodb+srv://vyshnavgr07:OLSPZQWnzLCxH32l@cluster0.zqa84q3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/weather', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('db connected'))
.catch((err) => console.log('Connection error', err));


server.listen(port,()=>{
    console.log(`Server is listening on port:${port}`);
})




