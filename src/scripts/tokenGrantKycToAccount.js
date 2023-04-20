import { Client, PrivateKey, TokenGrantKycTransaction } from "@hashgraph/sdk";
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
 * @description Grant KYC to account for Token.
 * 
 * @param {String} accountId AccountId to grant KYC for FT or NFT. 
 * @param {String} tokenId TokenID to grant KYC for account. 
 * @param {String} privKey privKey this is the privKey for user that wants to grant KYC for the token.
 *
 * @returns {Boolean} success
 */
export default async function grantKYCForToken(accountId = undefined, tokenId = undefined, privKey = undefined) {
  let kycEnableTx = await new TokenGrantKycTransaction()
    .setAccountId(accountId)
    .setTokenId(tokenId)
    .freezeWith(client)
    .sign(privKey);

  await kycEnableTx.execute(client);

  console.log(`Associated account: ${accountId} with the tokenId: ${tokenId}`);

  return true;
}
