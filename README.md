# Connection and interaction with Hedera blockchain platform.

This guide provides instructions on how to connect and interact with the Hedera blockchain platform, create custom tokens on the testnet, and set up your app to work with HashPack wallet.

### PREREQUISITES

- Node.js and npm installed
- Hedera JavaScript SDK installed: `@hashgraph/sdk`
- Install all the dependencies from `package.json`.
- A `.env` file in the root of your project with the following environment variables:

```
VITE_OPERATOR_ID=<your_operator_account_id>
VITE_OPERATOR_KEY=<your_operator_private_key>
VITE_HEDERA_NETWORK=<your_network>
VITE_USDT_TOKEN_ID=<your_USDT_token_id>
VITE_BARRAGE_TOKEN_ID=<your_barrage_token_id>
```

### DEPENDENCIES

```
npm install
```

This should install all necessary dependencies.

### RUN the Vue + Vite DAPP

```
npm run dev
```

### FOR TESTNET

Fungible (ERC20) stablecoin's are not available on the Hedera `testnet`.

If you are on the `testnet` and you want to test the code then you should create your custom token on the `testnet`. 

After token is created save `tokenId` to your .env file. The `tokenId` will be necessary for further development and testing. 

Additionally `tokenId` can be provided from the UI directly to the association method.

Before transferring token must be associated with both accounts `receiver` and `sender`.

In the HashPack wallet, go to the `Add token` button and paste `tokenId`, then press button `Associate token`.

If association does not work through the HashPack wallet, then associate token through the DAPP.

After custom token is created for `testnet`, next step is to connect your HashPack wallet with the DAPP.

## Connect APP with HashPack wallet.

### CONNECT HASHPACK WALLET WITH THE DAPP

- Press the button `Connect Wallet` this should prompt another screen for HashPack wallet login.

- After login, the next step is to `approve` the connection. Only non-ledger accounts can be connected with the DAPPs. 

- To create non-ledger account you must create an account from your main HashPack wallet.

- This should complete the connection process.

### ACCOUNT SETUP
 
- If you want to transfer Fungible token to new account then the following actions are required:
  - Associate account with the Fungible token
  - Grant KYC for the Fungible token

After you connect your wallet, pressing the button `Associate` should associate account with the token.

The account receiver must complete the same actions otherwise it won't be able to receive Fungible tokens.

### TRANSFER FUNGIBLE TOKENS

- For transferring tokens from your account to another account your DAPP must be connected with the HashPack wallet.

- Token must be associated with both accounts sender and receiver.

- Press the button `Send`, then HashPack wallet will prompt you with the `Approval` which is actually transaction signature and that completed the token transfer.

### SCRIPTS DIRECTORY

### `createKudos.js`

This script creates a Kudos token on the Hedera Hashgraph network using the Hedera JavaScript SDK. It sets up a client connected to the testnet, defines the token properties, and executes a `TokenCreateTransaction` to create the token.

### `associateTokenWithAccount.js`

To associate token with an account it's required to pass the `tokenId` and `accountId` that you want to be associated.

### `tokenGrantKycToAccount.js`

To grant KYC for account it's required to pass the `tokenId` and `accountId` that you want to grant KYC for.