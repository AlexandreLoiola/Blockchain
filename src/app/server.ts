import express from "express";
import blockchainRouter from "./routes/blockchain.routes";

const app = express();
app.use(express.json());

app.use("/api/blockchain", blockchainRouter);

const PORT = process.env.PORT || 3000;

export default function startServer() {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
