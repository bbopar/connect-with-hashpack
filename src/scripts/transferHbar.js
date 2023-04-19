import { TransferTransaction, AccountId } from "@hashgraph/sdk";

/**
 * @description Transfer Hbar from acc to acc.
 *
 * @returns {Boolean} success
 */
export default async function transferHbar(from, to, amount, signer) {
  const tx = await new TransferTransaction()
    .addHbarTransfer(AccountId.fromString(from), -amount)
    .addHbarTransfer(AccountId.fromString(to), amount)
    .freezeWithSigner(signer);

  await tx.executeWithSigner(signer);

  return true;
}
