import { HashConnect } from "hashconnect";
import { HashConnectConnectionState } from "hashconnect/dist/types";

/**
 * Can be removed as it's impl only for research purposes.
 */
export class HashconnectService {
  constructor(appMetadata) {
    this.hashconnect = new HashConnect(false);
    this.appMetadata = appMetadata;
    this.pairingData = null;
    this.availableExtension = null;
    this.state = HashConnectConnectionState.Disconnected;
    this.topic = "";
    this.pairingString = "";
  }

  async initHashconnect() {
    //create the hashconnect instance
    this.hashconnect = new HashConnect(true);

    //initialize and use returned data
    let initData = await this.hashconnect.init(
      this.appMetadata,
      "testnet",
      false
    );

    this.topic = initData.topic;
    this.pairingString = initData.pairingString;

    //Saved pairings will return here, generally you will only have one unless you are doing something advanced
    this.pairingData = initData.savedPairings[0];

    //register events
    this.setUpHashConnectEvents();
  }

  setUpHashConnectEvents() {
    // fired when a extension is found
    this.hashconnect.foundExtensionEvent.on((data) => {
      console.log(" TU SAM MATER TI JEBEM ");
      console.log("Found extension", data);
      this.availableExtension = data;

      console.log(
        "🚀 ~ file: HashconnectService.js:39 ~ HashconnectService ~ this.hashconnect.foundExtensionEvent.on ~ this.availableExtension:",
        this.availableExtension
      );

      const pairings = this.hashconnect.hcData.pairingData;

      console.log(
        "🚀 ~ file: HashconnectService.js:43 ~ HashconnectService ~ this.hashconnect.foundExtensionEvent.on ~ pairings:",
        pairings
      );

      this.hashconnect.findLocalWallets();

      this.hashconnect.connectToLocalWallet();
    });

    // fired when a wallet approves a pairing
    // this.hashconnect.pairingEvent.on((data) => {
    //   console.log("Paired with wallet", data);

    //   if (data.pairingData) {
    //       this.pairingData = data.pairingData;
    //   } else {
    //       console.error("pairingData is null or undefined");
    //   }
    // });

    // fired when HashConnect loses connection,
    // pairs successfully, or is starting connection
    this.hashconnect.connectionStatusChangeEvent.on((state) => {
      console.log("hashconnect state change event", state);
    });
  }

  async connectToExtension() {
    // will automatically pop up a pairing
    // request in the HashPack extension
    this.hashconnect.connectToLocalWallet();
  }

  async sendTransaction(
    trans,
    acctToSign,
    return_trans = false,
    hideNfts = false,
    getRecord = false
  ) {
    const transaction = {
      topic: this.topic,
      byteArray: trans,

      metadata: {
        accountToSign: acctToSign,
        returnTransaction: return_trans,
        hideNft: hideNfts,
        getRecord: getRecord,
      },
    };

    return await this.hashconnect.sendTransaction(this.topic, transaction);
  }

  async requestAccountInfo() {
    let request = {
      topic: this.topic,
      network: "mainnet",
      multiAccount: true,
    };

    await this.hashconnect.requestAdditionalAccounts(this.topic, request);
  }

  disconnect() {
    this.hashconnect.disconnect(this.pairingData?.topic);
    this.pairingData = null;
  }

  clearPairings() {
    this.hashconnect.clearConnectionsAndData();
    this.pairingData = null;
  }

  showResultOverlay(data) {
    const dialogPopup = new DialogInitializer(ResultModalComponent);

    dialogPopup.setCustomData({ data: data });

    dialogPopup.setConfig({
      Width: "500px",
      LayoutType: DialogLayoutDisplay.NONE,
    });

    dialogPopup.setButtons([
      new ButtonMaker("Done", "send", ButtonLayoutDisplay.SUCCESS),
    ]);

    dialogPopup.openDialog$().subscribe((resp) => {});
  }
}
