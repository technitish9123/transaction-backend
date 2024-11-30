import { TransactionType } from "../types/txTypes";
import {
  getNormalTransactions,
  getERC20Transactions,
  getERC1155Transactions,
} from "./etherscanHelper";
/**
 * Processes blockchain transactions and converts them into a unified format.
 *
 * This function fetches transactions from multiple APIs (Normal, ERC20, ERC1155),
 * deduplicates them, and formats them into the `TransactionType` structure.
 * Transactions are sorted by timestamp and returned as a unified list.
 *
 * @param {string} address - The blockchain address for which transactions are fetched and processed.
 * @returns {Promise<TransactionType[]>} - A promise that resolves to a list of processed and deduplicated transactions.
 *
 * @example
 * const address = "0xD76a4D4f15b64C52475f245c20B7447C910bDA70";
 * const transactions = await processTransactionsToType(address);
 * console.log(transactions);
 *
 * @throws {Error} - Throws an error if fetching or processing transactions fails.
 */

export const processTransactionsToType = async (
  address: string
): Promise<TransactionType[]> => {
  try {
    const seen = new Map<string, TransactionType>();

    const processTransaction = (
      tx: any,
      type: string,
      chain: string = "ETH"
    ) => {
      const hash = tx.hash || tx.transactionHash;

      // If the transaction is already seen, merge data
      if (seen.has(hash)) {
        const existing = seen.get(hash)!;
        if (type === "ERC20") {
          existing.receivedToken.push({
            symbol: tx.tokenSymbol,
            contractAddress: tx.contractAddress,
            amount: parseFloat(tx.value) / Math.pow(10, tx.tokenDecimal),
          });
        }
      } else {
        // Create a new transaction entry
        const transaction: TransactionType = {
          sender: {
            address: tx.from,
            chain,
          },
          receiver: {
            address: tx.to,
            chain,
          },
          sentToken: tx.value
            ? [
                {
                  symbol: type === "ERC20" ? tx.tokenSymbol : "ETH",
                  amount:
                    type === "ERC20"
                      ? parseFloat(tx.value) / Math.pow(10, tx.tokenDecimal)
                      : parseFloat(tx.value) / 1e18,
                },
              ]
            : [],
          receivedToken: [],
          type: type === "ERC20" ? "STAKE" : "TRANSFER",
          timestamp: parseInt(tx.timeStamp, 10) * 1000, // Convert to milliseconds
        };

        if (type === "ERC20") {
          transaction.receivedToken.push({
            symbol: tx.tokenSymbol,
            contractAddress: tx.contractAddress,
            amount: parseFloat(tx.value) / Math.pow(10, tx.tokenDecimal),
          });
        }

        seen.set(hash, transaction);
      }
    };

    // Fetch and process transactions in parallel
    const promises = [
      getNormalTransactions(address).then((txs) =>
        txs?.forEach((tx) => processTransaction(tx, "TRANSFER"))
      ),
      getERC20Transactions(address).then((txs) =>
        txs?.forEach((tx) => processTransaction(tx, "ERC20"))
      ),
      getERC1155Transactions(address)
        .then((txs) => txs?.filter((tx: any) => tx.tokenName.includes("stETH")))
        .then((filteredTxs) =>
          filteredTxs?.forEach((tx) => processTransaction(tx, "ERC1155"))
        ),
    ];

    await Promise.all(promises);

    return Array.from(seen.values()).sort((a, b) => a.timestamp - b.timestamp);
  } catch (error) {
    console.error("Error processing transactions:", error);
    throw error;
  }
};
