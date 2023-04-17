import { Client, PrivateKey, TokenCreateTransaction } from "@hashgraph/sdk";
/**
 * Constants.
 */
const treasuryAccountID = import.meta.env.VITE_OPERATOR_ID;
const treasuryPrivateKey = PrivateKey.fromString(import.meta.env.VITE_OPERATOR_KEY);
const treasuryPublicKey = treasuryPrivateKey.publicKey;

// Create a Hedera client
const client = Client.forTestnet(); // or Client.forMainnet()
client.setOperator(treasuryAccountID, treasuryPrivateKey);


/**
 * @description Create kudos token method.
 *
 * @returns {String} tokenId
 */
export default async function createKudos() {
  try {
    const transaction = new TokenCreateTransaction()
        .setTokenName("BarrageKudos")
        .setTokenSymbol("BKDS")
        .setDecimals(0)
        .setInitialSupply(1000000)
        .setTreasuryAccountId(treasuryAccountID)
        .setAdminKey(treasuryPublicKey)
        .setKycKey(treasuryPublicKey)
        .setFreezeKey(treasuryPublicKey)
        .setWipeKey(treasuryPublicKey)
        .setSupplyKey(treasuryPublicKey);
 
    console.log('## TRANSACTION ##', transaction);

    const response = await transaction.execute(client);

    console.log('#3');
    const receipt = await response.getReceipt(client);

    console.log('#4');
    const tokenId = receipt.tokenId;

    console.log('#5');

    console.log('🚀 ~ file: kudos.js:34 ~ createKudos ~ tokenId:', tokenId);

    return tokenId;
  } catch (e) {
    console.log('### ERROR ###', e);
  }
}