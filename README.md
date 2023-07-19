## Token ERC20 Upgradeable

# Fill .env file

```shell
DEPLOYER_PRIVATE_KEY1 = ""
RPC_URL = ""
BSC_TESTNET_URL = ""

ETHERSCAN_API_KEY = ""
COINMARKETCAP_API_KEY = ""
```
# Deploy

```shell
npm install
npx hardhat deploy --network <blockchain-network> --tags TokenERC20
npx hardhat --network mumbai run scripts/mint.ts
```
