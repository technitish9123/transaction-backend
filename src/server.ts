import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { processTransactionsToType } from "./utils/transactionProcessor";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint to process transactions
app.post("/api/transactions", async (req: Request, res: Response) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required." });
  }

  try {
    const transactions = await processTransactionsToType(address);
    console.log(transactions);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error processing transactions:", error);
    res.status(500).json({ error: "Failed to process transactions." });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
