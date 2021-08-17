let bnbPrice;
let accounts;
let myBalanceBnb;
let Accounttype = "0";
let contractAddress = "0x1B41821625d8CFAd21cd56491DACD57ECaCc83dE";
let abi = [{
    "inputs": [{
        "internalType": "string",
        "name": "name_",
        "type": "string"
    }, {
        "internalType": "string",
        "name": "symbol_",
        "type": "string"
    }, {
        "internalType": "uint256",
        "name": "supply_",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "maxTxPercent_",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "liquidityThresholdPercentage_",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "liquidityFee_",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "marketingFee_",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "dividendRewardsFee_",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "dividendRewardToken_",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "marketingWallet_",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "v2Router_",
        "type": "address"
    }],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "bool",
        "name": "isExcluded",
        "type": "bool"
    }],
    "name": "ExcludeFromFees",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
    }, {
        "indexed": false,
        "internalType": "bool",
        "name": "isExcluded",
        "type": "bool"
    }],
    "name": "ExcludeMultipleAccountsFromFees",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "uint256",
        "name": "newValue",
        "type": "uint256"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "oldValue",
        "type": "uint256"
    }],
    "name": "GasForProcessingUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "newLiquidityWallet",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "oldLiquidityWallet",
        "type": "address"
    }],
    "name": "LiquidityWalletUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "minTokensBeforeSwap",
        "type": "uint256"
    }],
    "name": "MinTokensBeforeSwapUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "iterations",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "claims",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "lastProcessedIndex",
        "type": "uint256"
    }, {
        "indexed": true,
        "internalType": "bool",
        "name": "automatic",
        "type": "bool"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "gas",
        "type": "uint256"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "processor",
        "type": "address"
    }],
    "name": "ProcessedDividendTracker",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "tokensSwapped",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "SendDividends",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "pair",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "bool",
        "name": "value",
        "type": "bool"
    }],
    "name": "SetAutomatedMarketMakerPair",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "sniperAddress",
        "type": "address"
    }],
    "name": "SniperCaught",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "half",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "newBalance",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "otherHalf",
        "type": "uint256"
    }],
    "name": "SwapAndLiquify",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
    }],
    "name": "SwapAndLiquifyEnabledUpdated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "newAddress",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "oldAddress",
        "type": "address"
    }],
    "name": "UpdateDividendTracker",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "newAddress",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "oldAddress",
        "type": "address"
    }],
    "name": "UpdateUniswapV2Router",
    "type": "event"
}, {
    "inputs": [],
    "name": "_dividendRewardsFee",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "_liquidityFee",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "_marketingFee",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "_totalFee",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "automatedMarketMakerPairs",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "burnAddress",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "liquidityFee",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "marketingFee",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "dividendFee",
        "type": "uint256"
    }],
    "name": "changeFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "decimals",
    "outputs": [{
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
    }],
    "name": "decreaseAllowance",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "dividendRewardTokenBalanceOf",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "dividendTracker",
    "outputs": [{
        "internalType": "contract DividendTracker",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "exclude",
        "type": "address"
    }],
    "name": "excludeDividends",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "excludeFromFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "gasForProcessing",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "getAccountDividendsInfo",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }, {
        "internalType": "int256",
        "name": "",
        "type": "int256"
    }, {
        "internalType": "int256",
        "name": "",
        "type": "int256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }],
    "name": "getAccountDividendsInfoAtIndex",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }, {
        "internalType": "int256",
        "name": "",
        "type": "int256"
    }, {
        "internalType": "int256",
        "name": "",
        "type": "int256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getClaimWait",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getLastProcessedIndex",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getNumberOfDividendTokenHolders",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getTotalDividendsDistributed",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "includeInFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
    }],
    "name": "increaseAllowance",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "isExcludedFromFee",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "isSniper",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "maxTxAmountUI",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "name",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "pancakeswapV2Pair",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "pancakeswapV2Router",
    "outputs": [{
        "internalType": "contract IPancakeRouter02",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "gas",
        "type": "uint256"
    }],
    "name": "processDividendTracker",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "removeSniper",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "pair",
        "type": "address"
    }, {
        "internalType": "bool",
        "name": "value",
        "type": "bool"
    }],
    "name": "setAutomatedMarketMakerPair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "dxRouter",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "presaleRouter",
        "type": "address"
    }],
    "name": "setDxSaleAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address payable",
        "name": "newWallet",
        "type": "address"
    }],
    "name": "setMarketingWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "maxTxPercent_",
        "type": "uint256"
    }],
    "name": "setMaxTxPercent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
    }],
    "name": "setSniperProtectionEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bool",
        "name": "_enabled",
        "type": "bool"
    }],
    "name": "setSwapAndLiquifyEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "snipersCaught",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "swapAndLiquifyEnabled",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "symbol",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "recipient",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "claimWait",
        "type": "uint256"
    }],
    "name": "updateClaimWait",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newAddress",
        "type": "address"
    }],
    "name": "updateDividendTracker",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "recipient",
        "type": "address"
    }],
    "name": "withdrawLockedETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "recipient",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_token",
        "type": "address"
    }],
    "name": "withdrawLockedTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "withdrawableDividendOf",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}]
const numberFormatter = new Intl.NumberFormat('en-US');
const currencyFormatter = new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency: 'USD',
});
window.web3 = new Web3('https://bsc-dataseed1.binance.org:443');
window.addEventListener("load", ()=>{
    interval = setInterval(async function checkConnection() {
        let isConnected = false;
        try {
            if (window.web3 && window.ethereum) {
                const accounts = await ethereum.send('eth_requestAccounts');
                console.log("Connected", accounts.result[0]);
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else if (window.ethereum) {
                const accounts = await ethereum.send('eth_requestAccounts');
                console.log("Connected", accounts.result[0]);
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                isConnected = true;
            }
            if (isConnected) {
                window.web3 = new Web3(window.ethereum);
                const web3 = window.web3;
                let accounts = await getAccounts();
                accountAd = accounts[0];
                jQuery("#buyaddress").val(accountAd);
                getData();
                let accountDetails = null;
                window.ethereum.on("accountsChanged", function(accounts) {
                    accountAd = accounts[0];
                    console.log(accounts);
                });
            }
            updateTotalDividendsInfo();
        } catch (error) {
            console.log("error", error);
        }
    }, 1500);
}
);
function isLocked() {
    window.web3.eth.getAccounts(function(err, accounts) {
        if (err != null) {
            console.log(err);
            jQuery("#lock").text(err);
        } else if (accounts.length === 0) {
            console.log("MetaMask is locked");
            jQuery("#lock").text("MetaMask is locked.");
        } else {
            console.log("MetaMask is unlocked");
            jQuery("#lock").text("MetaMask is unlocked.");
        }
    });
}
function getBalanceOfAccount(add) {
    window.web3.eth.getBalance(add, (err,wei)=>{
        myBalance = web3.utils.fromWei(wei, 'ether');
        myBalanceBnb = web3.utils.fromWei(wei, 'ether');
        console.log("Balance===>", myBalance);
        console.log("Balance===>", myBalanceBnb);
        $("#getBalance").text("Account Balance:" + myBalance + " " + "BNB");
        jQuery("#addressinfo").text(add + " | " + " BNB in Wallet " + myBalanceBnb + " -    YOU NEED TO HOLD MORE THAN 10,000,000,000 TOKENS TO RECEIVE DIVIDENDS");
    }
    )
}
const getAccounts = async()=>{
    try {
        const web3 = new Web3(window.ethereum)
        accounts = await web3.eth.getAccounts();
        jQuery("#account").text("Account:" + accounts[0]);
        console.log(accounts);
        return accounts;
    } catch (error) {
        console.log("Error while fetching acounts: ", error);
        return null;
    }
}
;
function handleEthereum() {
    const {ethereum} = window;
    if (ethereum && ethereum.isMetaMask) {
        console.log('Ethereum successfully detected!');
        jQuery("#metamaskConnection").text("Ethereum successfully detected!");
    } else {
        console.log('Please install MetaMask!');
        jQuery("#metamaskConnection").text("Please install MetaMask!");
    }
}
let totalHoldings;
function getEstimates() {
    let volume = jQuery("#tradingVolume").val();
    totalHoldings = totalHoldings ? totalHoldings : 0;
    let ownPercentage = ((totalHoldings * 1000000000) / 1000000000000000);
    console.log("Total holdings:" + totalHoldings);
    console.log(ownPercentage);
    let dailyReward = (volume * 0.15) * ownPercentage;
    console.log(dailyReward);
    jQuery("#bnbearninaweek").text(currencyFormatter.format(dailyReward));
    jQuery("#bnbearninamonth").text(currencyFormatter.format(dailyReward * 7));
    jQuery("#bnbearninsixmonth").text(currencyFormatter.format(dailyReward * 182));
    jQuery("#bnbearninperanum").text(currencyFormatter.format(dailyReward * 365));
}
async function updateTotalDividendsInfo() {
    let contract = new web3.eth.Contract(abi,contractAddress);
    let getTotalDividendsDistributed = await contract.methods.getTotalDividendsDistributed().call();
    jQuery("#gettotaldividenpaid").text(" " + currencyFormatter.format(Math.floor(web3.utils.fromWei(getTotalDividendsDistributed))));
}
async function queryVolume() {
    fetch('https://graphql.bitquery.io/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            query: `{
        ethereum(network: bsc) {
          dexTrades(
            options: {limit: 2, desc: "timeInterval.day"},
            baseCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"},
            quoteCurrency: {is: "0x1b41821625d8cfad21cd56491dacd57ecacc83de"}
          ) {
            timeInterval { day(count: 1) }
            trades: count
            tradeAmount(in: USDT)
          }
        }
      }`,
            variables: '{}',
        }),
    }).then(response=>{
        if (response.status === 200) {
            return response.json();
        } else {
            err(`Sorry, We couldn't get the Price. Bad response code : ` + response.status);
        }
    }
    ).then(json=>{
        const tradingVolume = json.data.ethereum.dexTrades[1].tradeAmount;
        jQuery('#tradingVolume').val(Math.floor(tradingVolume));
        getEstimates();
    }
    ).catch(error=>console.error(`Sorry, We couldn't get the Price. Error: ` + error))
}
queryVolume();
async function getData() {
    try {
        let addresss = jQuery("#buyaddress").val();
        await getBalanceOfAccount(addresss);
        let contract = new web3.eth.Contract(abi,contractAddress);
        return new Promise(async(resolve,reject)=>{
            let data = await contract.methods.balanceOf(addresss).call();
            totalHoldings = Math.floor(web3.utils.fromWei(data))
            jQuery("#ndcholdings").text(" " + Math.floor(web3.utils.fromWei(data)) + " B");
            jQuery("#balanceof").text(" " + Math.floor(web3.utils.fromWei(data)));
            jQuery("#earninaweek").text(" " + Math.floor(web3.utils.fromWei(data) * 1.02) + " B");
            jQuery("#earninamonth").text(" " + Math.floor(web3.utils.fromWei(data) * 1.07) + " B");
            jQuery("#earninsixmonth").text(" " + Math.floor(web3.utils.fromWei(data) * 1.50) + " B");
            jQuery("#earninperanum").text(" " + Math.floor(web3.utils.fromWei(data) * 2.25) + " B");
            jQuery("#bnbbalanceof").text(" " + Math.floor(web3.utils.fromWei(data)));
            let getAccountDividendsInfo = await contract.methods.getAccountDividendsInfo(addresss).call();
            console.log("tokensLeft", getAccountDividendsInfo);
            console.log("tokensLeft", getAccountDividendsInfo[4]);
            console.log("tokensLeft", getAccountDividendsInfo[5]);
            jQuery("#totalbnbpaid").text(" " + ((currencyFormatter.format(parseFloat(getAccountDividendsInfo[4]) / 1000000000000000000))));
            if (getAccountDividendsInfo[5] <= 0) {
                jQuery("#lastpayot").text(" Never ");
            } else if (getAccountDividendsInfo[5] > 0) {
                let timenow = Date.now();
                let timespent = timenow - (getAccountDividendsInfo[5] * 1000);
                let timespentMinutes = ((timespent / 1000) / 60).toFixed(0);
                jQuery("#lastpayot").text(timespentMinutes + " min ago");
            }
            if (getAccountDividendsInfo[6] > 0) {
                let nextclaim = new Date(getAccountDividendsInfo[6]);
                var hours = nextclaim.getHours();
                var minutes = nextclaim.getMinutes();
                var seconds = nextclaim.getSeconds();
                jQuery("#payoutloadpercent").text(" in " + hours + " : ", minutes + " : ", seconds);
            } else {
                jQuery("#payoutloadpercent").text("Processing! ");
            }
            getEstimates();
        }
        );
    } catch (e) {
        console.log("tokensLeft", e);
    }
}
