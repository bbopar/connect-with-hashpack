import { HashConnect } from "hashconnect";
import { defineStore } from "pinia";
import {
  AccountId,
  TokenAssociateTransaction,
  TokenGrantKycTransaction,
  TransferTransaction,
} from "@hashgraph/sdk";

export const useHashConnectWallet = defineStore("hashConnectWallet", () => {
  // TODO: this is custom token
  // - created with script `createKudos()`
  // - when transferring USDC or USDT (stablecoin)
  //   mock tokenId here or consider adding this 
  //   to .env file.
  // - mock USDC/USDT erc20 here.
  // const tokenId = "0.0.4086678";
  const tokenId = import.meta.env.VITE_BARRAGE_TOKEN_ID;

  // Not in use currently
  // double check this if it's 
  // necessary.
  let availableExtension = null;

  // TODO add network to .env
  let network = import.meta.env.VITE_HEDERA_NETWORK;

  // This is the accountIc
  // of the connected (paired) wallet.
  let accountId = "";

  // Object that holds save data obtained
  // when wallet is paired with DAPP or APP.
  let saveData = {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: {},
    pairedAccounts: [],
  };

  // APP metadata.
  let appMetadata = {
    network,
    name: "Barrageongo",
    description: "An example Barrage-Hedera dApp",
  };

  // HashConnect instance.
  let hashConnect = new HashConnect();

  // Signer instance.
  let signer = null;

  /**
   * Connect HashPack wallet.
   */
  async function connectWallet() {
    await hashConnect.init(appMetadata, network, false);

    await setUpHashConnectEvents();

    return hashConnect.connectToLocalWallet(saveData.pairingString);
  }

  /**
   * Setup connection handler for events.
   */
  async function setUpHashConnectEvents() {
    // fired when a extension is found
    hashConnect.foundExtensionEvent.on((data) => {
      availableExtension = data;
    });

    // This is the pairing event 
    // where data is obtained for further
    // communication between wallet and APP.
    hashConnect.pairingEvent.on((data) => {
      accountId = data.accountIds[0];
      saveData.topic = data.topic;
      const provider = hashConnect.getProvider(network, data.topic, accountId);
      signer = hashConnect.getSigner(provider);
    });

    // fired when HashConnect loses connection,
    // pairs successfully, or is starting connection
    hashConnect.connectionStatusChangeEvent.on((state) => {
      console.log("hashconnect state change event", state);
    });
  }

  /**
   * Send transaction using connected wallet as signer.
   */
  async function sendTransaction(amount, accId) {
    if (!accountId) {
      throw "You must pair wallet with the APP first.";
    }
    const tx = await new TransferTransaction()
      .addTokenTransfer(tokenId, AccountId.fromString(accountId), -amount)
      .addTokenTransfer(tokenId, AccountId.fromString(accId), amount)
      .freezeWithSigner(signer);

    await tx.executeWithSigner(signer);
  }

  /**
   * Associate token with account.
   */
  async function associateTokenWithAccount() {
    const tx = await new TokenAssociateTransaction()
      .setAccountId(accountId)
      .setTokenIds([tokenId]);

    await tx.executeWithSigner(signer);

    let kycEnableTx = await new TokenGrantKycTransaction()
      .setAccountId(id)
      .setTokenId(tokenId)
      .freezeWith(client)
      .sign(kycKey);

    await kycEnableTx.execute(client);
  }

  return { associateTokenWithAccount, connectWallet, sendTransaction };
});






/** 
   * Transfer -> HBAR
   * Send transaction using connected wallet as signer.
   */
  // async function sendTransaction(amount, accId) {
  //   if (!accountId) {
  //     throw 'You must pair wallet with the APP first.'
  //   }
  //   const tx = await new TransferTransaction()
  //     .addHbarTransfer(AccountId.fromString(accountId), -amount)
  //     .addHbarTransfer(AccountId.fromString(accId), amount)
  //     .freezeWithSigner(signer);

  //   await tx.executeWithSigner(signer);
  // }