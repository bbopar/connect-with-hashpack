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
 * @returns {Boolean} success
 */
export default async function grantKYCForToken(accountId, tokenId) {
  let kycEnableTx = await new TokenGrantKycTransaction()
    .setAccountId(accountId)
    .setTokenId(tokenId)
    .freezeWith(client)
    .sign(treasuryPrivateKey);

  await kycEnableTx.execute(client);

  console.log(`Associated account: ${accountId} with the tokenId: ${tokenId}`);

  return true;
}
