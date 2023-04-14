
import { HashConnect } from 'hashconnect';
import { defineStore } from "pinia";
import { TransferTransaction, AccountId } from '@hashgraph/sdk';

export const useHashConnectWallet = defineStore('hashConnectWallet', () => {
  let availableExtension = null;

  let accountId = '';

  let saveData = {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: {},
    pairedAccounts: []
  };

  let appMetadata = {
    network: "testnet",
    name: "Barrageongo",
    description: "An example Barrage-Hedera dApp",
  };

  let hashConnect = new HashConnect();

  /**
   * Connect HashPack wallet.
   */
  async function connectWallet() {
    let initData = await hashConnect.init(appMetadata);
    saveData.privateKey = initData.privKey;

    console.log('🚀 ~ file: connectWallet.js:26 ~ connectWallet ~ initData:', initData);
    
    let state = await hashConnect.connect();
    saveData.topic = state.topic;

    console.log('🚀 ~ file: connectWallet.js:32 ~ connectWallet ~ saveData.topic:', saveData.topic);

    saveData.pairingString = hashConnect.generatePairingString(state, 'testnet', false);

    const result = hashConnect.findLocalWallets();

    console.log('🚀 ~ file: connectWallet.js:42 ~ connectWallet ~ result:', result);

    hashConnect.connectToLocalWallet(saveData.pairingString);

    setUpHashConnectEvents();
  }

  /**
   * Setup connection handler for events.
   */
  async function setUpHashConnectEvents() {
    // fired when a extension is found
    hashConnect.foundExtensionEvent.on((data) => {
      console.log('FOUND EXTENSION TODO:');

      availableExtension = data;
    });

    hashConnect.pairingEvent.on((data) => {
      accountId = data.accountIds[0];
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
  async function sendTransaction() {
    const provider = hashConnect.getProvider('testnet', saveData.topic, accountId);

    const signer = hashConnect.getSigner(provider);

    const trx = await new TransferTransaction()
        .addApprovedHbarTransfer(AccountId.fromString(accountId), new Hbar(-1))
        .addHbarTransfer(AccountId.fromString(), new Hbar(1))
        .freezeWithSigner(signer);

    let res = await trans.executeWithSigner(signer);
  }

  return { connectWallet, sendTransaction };
});
