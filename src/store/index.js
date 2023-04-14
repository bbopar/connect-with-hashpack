import { HashConnect } from 'hashconnect';
import { defineStore } from "pinia";
import swal from "sweetalert2";

/**
 * This one can be removed as it's implemented only for the
 * research purposes.
 */
export const useHashConnect = defineStore('hashconnect', () => {
  let isLoading = false;
  let connected = false;
  let isConnected = false;
  let pairingData = {};
  let availableExtension = null;
  let hashConnect = new HashConnect();
  let showAccountDialog = false;
  let userAddressHedera = "";
  let saveData = {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: {},
    pairedAccounts: []
  };
  let appMetadata = {
    network: "testnetwork",
    name: "Barrageongo",
    description: "An example Barrage-Hedera dApp",
  };

  async function initHashconnect() {
    hashConnect = new HashConnect(true);

    //initialize and use returned data
    let initData = await hashConnect.init(
      appMetadata,
      "testnet",
      false
    );

    saveData.topic = initData.topic;
    saveData.pairingString = initData.pairingString;

    //Saved pairings will return here, generally you will only have one unless you are doing something advanced
    pairingData = initData.savedPairings[0];

    //register events
    setUpHashConnectEvents();
  }

  async function setUpHashConnectEvents() {
    // fired when a extension is found
    hashConnect.foundExtensionEvent.on((data) => {
      availableExtension = data;

      const pairings = hashConnect.hcData.pairingData;

      console.log('## pairings ##', pairings);

      hashConnect.findLocalWallets();

      hashConnect.connectToLocalWallet();
    });
  }

  async function connectToExtension() {
    // will automatically pop up a pairing
    // request in the HashPack extension
    hashConnect.connectToLocalWallet();
  }

  function clearDataInLocalStorage() {
    localStorage.clear()
  };

  function clearParing() {
    saveData.pairedAccounts = []
    clearDataInLocalStorage();
    window.location.reload()
  };

  async function connectHashConnectWallet() {
    try {
      hashConnect.value = new HashConnect(false);
      let loadData = await loadLocalData();

      console.log('🚀 ~ file: index.js:43 ~ connectHashConnectWallet ~ loadData:', loadData);

      if (true) {
        let initData = await hashConnect.init(appMetadata);

        console.log(' ### initData ###', initData);
        
        saveData.value.privateKey = initData.privKey;
        
        const state = await hashConnect.connect();

        saveData.value.topic = state.topic;

        saveData.value.pairingString = hashConnect.generatePairingString(state, "testnet", true);

        await parsePairingString();

        await setUpEvents();

        console.log('saveData', saveData);

        if (saveData.value.pairedAccounts.length === 0) {
          showAccountDialog.value = true;
        }
        else {
          let saveData = await getDataInLocalstorage();
          if (saveData.found) {
            saveData = saveData.data
            userAddressHedera = saveData.value.pairedAccounts[0]
          }
        }
      }
      else {
        console.log('############# ELSE  ###########');
        console.log("Paring String: ", saveData.value.pairingString)
        console.log("Paired Accounts: ", saveData.value.pairedAccounts)

        if (saveData.value.pairedAccounts.length > 0) {
          await hashConnect.init(appMetadata, saveData.value.privateKey);
          await hashConnect.connect(saveData.value.topic, saveData.value.pairedWalletData);
          await parsePairingString();
          await setUpEvents();
          console.log("Paired hashpack: ")
          if (saveData.value.pairedAccounts.length === 0) {
            showAccountDialog.value = true;
          }
          else {
            saveData = await getDataInLocalstorage();
            if (saveData.found) {
              saveData = saveData.data
              userAddressHedera = saveData.value.pairedAccounts[0]
            }
          }
        }
      }
    } catch (error) {
      console.log(" ####### error connecting  hash connect wallet:  #######", error)
      errorWithFooterExtension({
        errorTitle:"Mising Extension",
        message: "Seems like you dont have HashConnect installed please use the below link to download",
        footer: `<a href= https://www.hashpack.app/hashconnect> Download HashPack</a>`,
      });
    }
  }

  async function errorWithFooterExtension(context, message) {
    swal.fire({
      icon: "error",
      title: message.errorTitle,
      text: message.message,
      footer: message.footer,
    }).then((result) => {
      window.location.reload()
    });
  };

  async function getDataInLocalstorage() {
    var data = localStorage.getItem("hashconnectData");
    if (data) {
      return {
        data: JSON.parse(data),
        found: true
      }
    }
    else {
      return {
        data: {},
        found: false
      }
    }
  };

  async function loadLocalData() {
    let foundData = localStorage.getItem("hashconnectData");
    console.log("localDataFound: ", foundData);
    if (foundData) {
      saveData.value = JSON.parse(foundData);
      console.log("Found local data", saveData)
      return true;
    }
    else
      return false;
  };
  
  async function parsePairingString() {
    console.log('### saveData ###', saveData);
    pairingData = hashConnect.decodePairingString(saveData.value.pairingString);
  }

  async function saveDataInLocalstorage() {
    let data = JSON.stringify(saveData);

    localStorage.setItem("hashconnectData", data);
  };
  
  async function setUpEvents() {
    hashConnect.foundExtensionEvent.on(async (data) => {
      availableExtension.value = data;

      // hashConnect.hcData.pairingData;

      hashConnect.findLocalWallets();

      hashConnect.connectToLocalWallet();
    });

    hashConnect.pairingEvent.on((data) => {
      console.log("### Paired with wallet ###", data);

      saveData.pairedWalletData = data.metadata;

      data.accountIds.forEach(id => {
        if (saveData.pairedAccounts.indexOf(id) == -1)
          saveData.pairedAccounts.push(id);
      })
      userAddressHedera = saveData.pairedAccounts[0]
      saveDataInLocalstorage();
    });


    hashConnect.transactionEvent.on((data) => {
      //this will not be common to be used in a dapp
      console.log("transaction event callback: ", data);
    });
  };

  function propagateError(context, message) {
    swal.fire("Error!", message.error, "error").then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {}
    });
  };

  return { connectHashConnectWallet };
});
