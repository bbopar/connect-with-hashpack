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
 * @returns {Boolean} success
 */
export default async function associateTokenWithAccount() {
  const tx = await new TokenAssociateTransaction()
    .setAccountId(accountId)
    .setTokenIds([tokenId]);

  await tx.executeWithSigner(signer);

  console.log(`Associated account: ${accountId} with the tokenId: ${tokenId}`);

  return true;
}
