<script setup>
import { createKudos } from '../scripts';
import { ref } from "vue";
import { useHashConnectWallet } from '../store/connectWallet'

let message = ref('Welcome to the Vue.js and Vite Project!');
let tokenID = ref("");

const hcWallet = useHashConnectWallet();

/**
 * Connect HashPack wallet with the app.
 */
async function handleWalletConnection() {
  await hcWallet.connectWallet();
}

async function initiateSendTransaction() {
  await hcWallet.sendTransaction();
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
    <button @click="handleWalletConnection">Connect Wallet</button>
    <button @click="initiateSendTransaction">Send transaction</button>
    <button @click="handleCreateKudos">Create Tokens</button>
    <p>TokenID: {{ tokenID }}</p>
  </div>
</template>



<style scoped>
h1 {
  color: #42b983;
}
</style>
