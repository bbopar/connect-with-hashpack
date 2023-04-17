# Connection and interaction with Hedera blockchain platform.

This guide provides instructions on how to connect and interact with the Hedera blockchain platform, create custom tokens on the testnet, and set up your app to work with HashPack wallet.

## Prerequisites

- Node.js and npm installed
- Hedera JavaScript SDK installed: `@hashgraph/sdk`
- A `.env` file in the root of your project with the following environment variables:

```
VITE_OPERATOR_ID=<your_operator_account_id>
VITE_OPERATOR_KEY=<your_operator_private_key>
VITE_HEDERA_NETWORK=<your_network>
VITE_USDT_TOKEN_ID=<your_USDT_token_id>
VITE_BARRAGE_TOKEN_ID=<your_barrage_token_id>
```

## Scripts directory
### Create Kudos token on the testnet

This script creates a Kudos token on the Hedera Hashgraph network using the Hedera JavaScript SDK. It sets up a client connected to the testnet, defines the token properties, and executes a `TokenCreateTransaction` to create the token.


### Important Note for Testnet

ERC20 stablecoin's are not available on the Hedera `testnet`.

If you are on the `testnet` and you want to test the code then you should customize the `createKudos` script and create you custom token on the `testnet`. 

After token is created save `tokenId` to your .env file. The `tokenId` will be necessary for further development and testing.

## Connect APP with HashPack wallet.

## Prerequisites
- Node.js and npm installed
- HashPack wallet extension installed (in the browser).
- Install all the dependencies from `package.json`.
- Setup `.env` file.

After custom token is created for `testnet`, next step is to connect your HashPack wallet with the APP. You must have the HashPack extension installed.

## Running the APP

```
npm run dev
```

### Connecting the HashPack wallet with the APP

- Press the button `Connect Wallet` this should prompt with the screen for wallet Login.

- After Login, the next step is to `approve` the connection but only non-ledger accounts can be connected. To create non-ledger account you must create account from your main account on the HashPack wallet.

- This should complete the connection process. When you are on `testnet`, HashPack wallet will indicate it with the message.


### Account setup for ERC20 token
 
- If you want to transfer ERC20 token to new account then the following actions are required:
  - Associate account with the Token
  - Grant KYC for the Token

After you connect your wallet and press the button `Associate account with token` your new token should be associated with your account and KYC should be granted.

The account receiver must complete the same actions otherwise it won't be able to receive ERC20 token. 

### Transfer ERC20 tokens from account to account after connecting your wallet with the APP

- For transferring tokens from your account to another account your APP must be connected with the HashPack wallet.

- The amount of tokens and the account id must be provided for `Token Transfer`.

- Press the button `Send transaction`, then HashPack wallet will prompt you with the `Approve message` which is trx signature and then you transaction will be completed.