<script setup>
import { createKudos } from '../scripts';
import { ref } from "vue";
import { useHashConnectWallet } from '../store'

let message = ref('Welcome to the Barrango');
let tokenID = ref("");
let amount = ref("");
let accountId = ref("");
let msgAssociate = ref('Associate your account with the custom token.');
let msgConnectWallet = ref('Connect your wallet with the APP here.');
let msgSendToken = ref('Send token from your wallet to desired account.');
let msgCreateCustomToken = ref('Here you can create custom token.');
let msgForToken = ref('The custom token is created to test the functionality of transferring ERC20 tokens on Hedera blockchain platform from account to account.\n This will not be necessary when we want to include stablecoin transfer.\n USDC or USDT ERC20 tokens are not available on Hedera testnet env.');

const hcWallet = useHashConnectWallet();

/**
 * Associate account with custom token.
 * 
 * Here connected wallet account will 
 * be associated with the token.
 */
 async function associateAcc() {
  await hcWallet.associateTokenWithAccount();
}

/**
 * Connect HashPack wallet with the app.
 */
async function handleWalletConnection() {
  await hcWallet.connectWallet();
}

/**
 * Initiate sending tokens from wallet to provided account.
 */
async function initiateSendTransaction() {
  await hcWallet.sendTransaction(amount.value, accountId.value);
}

/**
 * Handle create Kudos token.
 */
async function handleCreateKudos() {
  let token = await createKudos();
  tokenID = token.num.low;
}

</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <h2>{{ msgCreateCustomToken }}</h2>
    <h6>{{ msgForToken }}</h6>
    <button @click="handleCreateKudos">Create Tokens</button>
    <h2>{{ msgConnectWallet }}</h2>
    <button @click="handleWalletConnection">Connect Wallet</button>
    <h2>{{ msgAssociate }}</h2>
    <button @click="associateAcc">Associate account with token</button>
    <h2>{{ msgSendToken }}</h2>
    <label>Amount: <input type="text" v-model="amount"></label>
    <label>Account ID: <input type="text" v-model="accountId"></label>
    <button @click="initiateSendTransaction">Send transaction</button>
    <p>TokenID: {{ tokenID }}</p>
  </div>
</template>



<style scoped>
h2 {
  color: #42b983;
}
h1 {
  color: #42b983;
}
</style>
