import express, { json, urlencoded } from "express";
import cors from "cors";
import { config } from "./config/index.js";
import { assistantRouter } from "./routes/assistantRoute.js";

const app = express();
const PORT = config.port || 3000;

// const whitelist = [/^https:\/\/(.+\.)?nogadev\.com$/, /^http:\/\/localhost:5173$/,"http://napsix_chat.test"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || whitelist.some(pattern => pattern.test(origin))) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
    
//     }}}

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/api", assistantRouter)


app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
