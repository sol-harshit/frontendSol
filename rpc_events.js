const {ethers, JsonRpcProvider} = require("ethers");

const node = 'https://proud-powerful-thunder.matic-testnet.quiknode.pro/d0f093f5c463574c1f4b68e59ccebcb2a18d8bde/';
const provider = new JsonRpcProvider(node);

const contractAddress = '0xb0E07d87Cf65a1f4A80175d63F8eb9BAD8afa259';

const tokenAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "age",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "indexed": false,
                "internalType": "struct Events.Person",
                "name": "p",
                "type": "tuple"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "newPerson",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_age",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "setPerson",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getPerson",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "age",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "internalType": "struct Events.Person",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const contract = new ethers.Contract(contractAddress, tokenAbi, provider);



async function main() {
    contract.on("newPerson", (owner, p, timestamp) => {
        console.log(`New person: ${owner}, ${p.age}, ${p.name}, ${timestamp}`);
    })
}

// read the contract events, using a promise
main().then(() => {
    console.log("Listening for events...");
}).catch((e) => {
    console.error(e);
});