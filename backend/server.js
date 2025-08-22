import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';


const MongoDB_URI = process.env.ATLASDB_URL;
const app = express();
const PORT = '8080';


app.use(express.json());
app.use(cors());

main()
  .then(() => console.log("Database Connected."))
  .catch((err) => console.log(`Database Connection Failed: ${err}`))
  
  
async function main() {
  await mongoose.connect(MongoDB_URI)
}

app.use("/api", chatRoutes);


app.listen(PORT, () => {
  console.log( `App is listening on port: ${PORT}`);
})