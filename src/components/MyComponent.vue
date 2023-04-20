<script setup>
import { createKudos } from '../scripts';
import { ref } from "vue";
import { useHashConnectWallet } from '../store'

let tokenID = ref("");
let amount = ref("");
let accountId = ref("");
// Fungible token ID.
let ftID = ref("");
// ftAssID Fungible ID to associate with.
let ftAssID = ref("");
let msg = ref('Create Fungible token. This will create the Fungible token from Treasury account that is defined in .env file.');
let grantKYCMsg = ref('Grant KYC to connected account for the Fungible token created in the previous step.');
let msgAssAcc = ref('In case association with the token does not work then associate connected account with the Fungible token created in the previous step here.');
let msgSendTrx = ref('Transfer fungible tokens from connected account to provided account');

const hcWallet = useHashConnectWallet();

/**
 * Associate account with custom token.
 * 
 * Here connected wallet account will 
 * be associated with the token.
 */
async function associateAcc() {
  await hcWallet.associateTokenWithAccount(ftID.value);
}

async function grantKYCForAccount() {
  await hcWallet.grantKYCForConnectedAccount(ftID.value);
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
  tokenID.value = `0.0.${token.num.low}`;
}

</script>

<template>
  <div>
    <div>
      <button class="connect-wallet-btn" @click="handleWalletConnection">Connect Wallet</button>
      <p>TokenID: {{ tokenID }}</p>
    </div>

    <div>
      <h4> {{ msg }} </h4>
      <button class="create-tokens-btn" @click="handleCreateKudos">Create Tokens</button>
    </div>

    <div class="input-ft-id">
      <label>Token ID:</label>
      <input type="text" v-model="ftID">
    </div>

    <div>
      <h5> {{ grantKYCMsg }} </h5>
      <button class="grant-kyc-to-acc-btn" @click="grantKYCForAccount">Grant KYC for FT</button>
    </div>

    <div class="input-send-trx">
      <label>Amount:</label>
      <input type="text" v-model="amount">
      <label>Account ID:</label>
      <input type="text" v-model="accountId">
    </div>

    <div>
      <h7> {{ msgSendTrx }} </h7>
      <button class="send-trx-btn" @click="initiateSendTransaction">Send transaction</button>
    </div>

    <div class="input-ass-ft-id">
      <label>Token ID:</label>
      <input type="text" v-model="ftAssID">
    </div>

    <div>
      <h8> {{ msgAssAcc }} </h8>
      <button class="associate-acc-btn" @click="associateAcc">Associate acc with FT</button>
    </div>
  </div>
</template>

<style scoped>
.connect-wallet-btn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: blue;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
}

.create-tokens-btn {
  position: absolute;
  top: 10%;
  left: 10%;
  transform: translateY(-50%);
  background-color: #1E90FF;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
}

.grant-kyc-to-acc-btn {
  position: absolute;
  top: 30%;
  left: 10%;
  transform: translateY(-50%);
  background-color: #1E90FF;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
}

.send-trx-btn {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  background-color: #1E90FF;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
}

.input-ft-id {
  position: absolute;
  top: 35%;
  left: 10%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
}

.input-send-trx {
  position: absolute;
  top: 55%;
  left: 10%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
}

.input-send-trx label {
  margin-right: 10px;
}

.associate-acc-btn {
  position: absolute;
  top: 68%;
  left: 10%;
  transform: translateY(-50%);
  background-color: #1E90FF;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
}

.input-ass-ft-id {
  position: absolute;
  top: 72%;
  left: 10%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
}

.input-ass-ft-id label {
  margin-right: 10px;
}



h2 {
  color: #dc0707;
}

h1 {
  color: #b1b942;
}

h4 {
  position: absolute;
  top: 12%;
  left: 10%;
  background-color: rgb(182, 182, 193);
  color: rgb(237, 1, 1);
  border: none;
  padding: 10px;
  font-size: 16px;
}

h5 {
  position: absolute;
  top: 36%;
  left: 10%;
  background-color: rgb(182, 182, 193);
  color: rgb(237, 1, 1);
  border: none;
  padding: 10px;
  font-size: 16px;
}

h6 {
  position: absolute;
  top: 60%;
  left: 10%;
  background-color: rgb(182, 182, 193);
  color: rgb(237, 1, 1);
  border: none;
  padding: 10px;
  font-size: 16px;
}

h7 {
  font-weight: bold;
  position: absolute;
  top: 58%;
  left: 10%;
  background-color: rgb(182, 182, 193);
  color: rgb(237, 1, 1);
  border: none;
  padding: 10px;
  font-size: 16px;
}

h8 {
  font-weight: bold;
  position: absolute;
  top: 76%;
  left: 10%;
  background-color: rgb(182, 182, 193);
  color: rgb(237, 1, 1);
  border: none;
  padding: 10px;
  font-size: 16px;
}

p {
  position: absolute;
  top: 19%;
  left: 10%;
  transform: translateY(-50%);
  background-color: rgb(168, 168, 186);
  color: rgb(237, 1, 1);
  border: none;
  padding: 10px;
  font-size: 16px;
}
</style>
