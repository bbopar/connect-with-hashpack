import { HashConnect } from 'hashconnect';

/**
 * Test wallet pairing. 
 * Just testing example.
 * Can be removed later.
 */
export const advancePairing = async () => {
  let appMetadata = {
      url: 'http://localhost:3000',
      name: 'Barrango',
      description: "Barrango - Hedera playground",
      icon: '',
  };

  let hashconnect = new HashConnect(true);

  let initData = await hashconnect.init(appMetadata, 'testnet', true);

  console.log('🚀 ~ file: newPairing.js:15 ~ advancePairing ~ initData:', initData);
  console.log('🚀 ~ file: newPairing.js:16 ~ advancePairing ~ initData.privKey', initData.privKey);


  const savedPairings = hashconnect.hcData;

  console.log('🚀 ~ file: newPairing.js:18 ~ advancePairing ~ savedPairings:', savedPairings);
  

  hashconnect.foundExtensionEvent.once((walletMetadata) => {
      const pairings = hashconnect.hcData.pairingData;

      console.log('🚀 ~ file: newPairing.js:24 ~ hashconnect.foundExtensionEvent.once ~ pairings:', pairings);
      
      console.log(walletMetadata);

      console.log('🚀 ~ file: newPairing.js:28 ~ hashconnect.foundExtensionEvent.once ~ walletMetadata:', walletMetadata);
      
      hashconnect.findLocalWallets();

      hashconnect.connectToLocalWallet();
  });
}

export const dissconnect = async() =>{
  let appMetadata = {
    url: 'http://localhost:3000',
    name: 'Barrango',
    description: "Barrango - Hedera playground",
    icon: '',
  };

  let hashconnect = new HashConnect(false);

  let initData = await hashconnect.init(appMetadata, 'testnet', true);

  console.log('🚀 ~ file: newPairing.js:47 ~ dissconnect ~ initData:', initData);

  const topic = hashconnect.hcData.topic;

  console.log('🚀 ~ file: newPairing.js:49 ~ dissconnect ~ topic:', topic);

  hashconnect.disconnect(topic);
  console.log('disconnected');
}

function genPairingStrAndHandleEvent(hashconnect, initData) {
  const pairingString = hashconnect.generatePairingString(initData.topic,'testnet',true);

  console.log('🚀 ~ file: newPairing.js:75 ~ genPairingStrAndEmit ~ pairingString:', pairingString);
  
  hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
    console.log('🚀 ~ file: newPairing.js:79 ~ hashconnect.acknowledgeMessageEvent.once ~ acknowledgeData:', acknowledgeData);
    
    if( acknowledgeData.result) {
      const pairings = hashconnect.hcData.pairingData;

      console.log('🚀 ~ file: newPairing.js:83 ~ hashconnect.acknowledgeMessageEvent.once ~ pairings:', pairings);

      const new_account = pairings[0].accountIds;

      console.log('🚀 ~ file: newPairing.js:86 ~ hashconnect.acknowledgeMessageEvent.once ~ new_account:', new_account);

      const topic = pairings[0].topic;

      console.log('🚀 ~ file: newPairing.js:89 ~ hashconnect.acknowledgeMessageEvent.once ~ topic:', topic);
    }
  });
}