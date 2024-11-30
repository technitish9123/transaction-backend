import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; // Replace with your Etherscan API key
const BASE_URL = "https://api.etherscan.io/v2/api";

export const getNormalTransactions = async (
  address: string
): Promise<any[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        chainid: 1,
        module: "account",
        action: "txlist",
        address,
        startblock: 0,
        endblock: 99999999,
        sort: "asc",
        apikey: ETHERSCAN_API_KEY,
      },
    });

    return response.data.result; // Returns raw transaction data
  } catch (error: any) {
    throw error;
  }
};

/*
https://api.etherscan.io/v2/api
   ?chainid=1
   &module=account
   &action=txlistinternal
   &address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
   &startblock=0
   &endblock=2702578
   &page=1
   &offset=10
   &sort=asc
   &apikey=YourApiKeyToken
*/
export const getInternalTransactions = async (
  address: string
): Promise<any[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        chainid: 1,
        module: "account",
        action: "txlistinternal",
        address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10000,
        sort: "asc",
        apikey: ETHERSCAN_API_KEY,
      },
    });

    return response.data.result;
  } catch (error: any) {
    throw error;
  }
};

/*
https://api.etherscan.io/v2/api
   ?chainid=1
   &module=account
   &action=tokentx
   &contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2
   &address=0x4e83362442b8d1bec281594cea3050c8eb01311c
   &page=1
   &offset=100
   &startblock=0
   &endblock=27025780
   &sort=asc
   &apikey=YourApiKeyToken
*/
export const getERC20Transactions = async (address: string): Promise<any[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        chainid: 1,
        module: "account",
        action: "tokentx",
        address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10000,
        sort: "asc",
        apikey: ETHERSCAN_API_KEY,
      },
    });

    return response.data.result;
  } catch (error: any) {
    throw error;
  }
};

/*
https://api.etherscan.io/v2/api
   ?chainid=1
   &module=account
   &action=tokennfttx
   &contractaddress=0x06012c8cf97bead5deae237070f9587f8e7a266d
   &address=0x6975be450864c02b4613023c2152ee0743572325
   &page=1
   &offset=100
   &startblock=0
   &endblock=27025780
   &sort=asc
   &apikey=YourApiKeyToken
*/
export const getERC721Transactions = async (
  address: string
): Promise<any[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        chainid: 1,
        module: "account",
        action: "tokennfttx",
        address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10000,
        sort: "asc",
        apikey: ETHERSCAN_API_KEY,
      },
    });

    return response.data.result;
  } catch (error: any) {
    throw error;
  }
};

/*
https://api.etherscan.io/v2/api
   ?chainid=1
   &module=account
   &action=token1155tx
   &contractaddress=0x76be3b62873462d2142405439777e971754e8e77
   &address=0x83f564d180b58ad9a02a449105568189ee7de8cb
   &page=1
   &offset=100
   &startblock=0
   &endblock=99999999
   &sort=asc
   &apikey=YourApiKeyToken
*/
export const getERC1155Transactions = async (
  address: string
): Promise<any[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        chainid: 1,
        module: "account",
        action: "token1155tx",
        address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10000,
        sort: "asc",
        apikey: ETHERSCAN_API_KEY,
      },
    });

    return response.data.result;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Fetch transaction details by transaction hash.
 * @param {string} txHash - The transaction hash.
 * @returns {Promise<any>} - Returns transaction details.
 */
export const getTransactionDetailsByHash = async (
  txHash: string
): Promise<any> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        chainId: 1,
        module: "proxy",
        action: "eth_getTransactionByHash",
        txhash: txHash,
        apikey: ETHERSCAN_API_KEY,
      },
    });

    if (response.data.result) {
      return response.data.result;
    } else {
      throw new Error("Transaction not found or API error.");
    }
  } catch (error: any) {
    console.error("Error fetching transaction details:", error.message);
    throw error;
  }
};

/*
https://api.etherscan.io/v2/api
   ?chainid=1
   &module=proxy
   &action=eth_getTransactionReceipt
   &txhash=0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb
   &apikey=YourApiKeyToken
*/
export const getTransactionReceipt = async (txHash: string): Promise<any> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        chainId: 1,
        module: "proxy",
        action: "eth_getTransactionReceipt",
        txhash: txHash,
        apikey: ETHERSCAN_API_KEY,
      },
    });

    if (response.data.result) {
      return response.data.result;
    } else {
      throw new Error("Transaction receipt not found or API error.");
    }
  } catch (error: any) {
    console.error("Error fetching transaction receipt:", error.message);
    throw error;
  }
};

/*
https://api.coingecko.com/api/v3/coins/list?include_platform=true
*/
export const getCoinList = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list",
      {
        params: {
          include_platform: true,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
