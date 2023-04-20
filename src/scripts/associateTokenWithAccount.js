import { Client, PrivateKey, TokenAssociateTransaction } from "@hashgraph/sdk";
/**
 * Constants.
 */
const treasuryAccountID = import.meta.env.VITE_OPERATOR_ID;
const treasuryPrivateKey = PrivateKey.fromString(
  import.meta.env.VITE_OPERATOR_KEY
);

// Create a Hedera client
const client = Client.forTestnet(); // or Client.forMainnet()
client.setOperator(treasuryAccountID, treasuryPrivateKey);

/**
 * @description Associate token with account.
 * 
 * This implementation should not be connected with the frontend.
 * Because it requires private key from the account that wants to be associated.
 * 
 * @param {String} accountId AccountId to associate with FT or NFT. 
 * @param {String} tokenId TokenID to associate with account. 
 * @param {String} privKey privKey this is the privKey for user that wants to be associated with the token. 
 *
 * @returns {Boolean} success
 */
export default async function associateTokenWithAccount(accountId = undefined, tokenId = undefined, privKey = undefined) {
  if (!accountId || !tokenId || !privKey) {
    throw 'MISSING PARAMETERS';
  }

  const tx = await new TokenAssociateTransaction()
    .setTokenIds([tokenId])
    .setAccountId(accountId)
    .freezeWith(client)
    .sign(privKey);

  console.log('## CLI ##', client);

  let submitTx = await tx.execute(client);

  let receiptTx = await submitTx.getReceipt(client);

  console.log(
    `Your FT Manual Association: ${receiptTx.status.toString()} \n`
  );

  console.log(`Associated account: ${accountId} with the tokenId: ${tokenId}`);

  return true;
}
