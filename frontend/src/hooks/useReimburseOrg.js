import { useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { baseSepolia } from "@reown/appkit/networks";
import { parseUnits } from "ethers";

const useReimburseOrg = () => {
  const contract = useContract(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (amount) => {
      if (!amount) {
        toast.error("Missing amount field");
        return;
      }
      if (!address) {
        toast.error("Connect your wallet!");
        return;
      }
      if (Number(chainId) !== baseSepolia.chainId) {
        toast.error("You are not connected to the right network");
        return;
      }

      if (!contract) {
        toast.error("Cannot get contract!");
        return;
      }

      try {
        const parsedAmount = parseUnits(amount.toString(), 18);

        const estimatedGas = await contract.reimburseOrganization.estimateGas(
          parsedAmount
        );
        const tx = await contract.reimburseOrganization(parsedAmount, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Organization reimbursed successfully");
          return;
        }
        toast.error("Reimbursement failed");
        return;
      } catch (error) {
        console.trace(error);
        console.error("Error while reimbursing organization: ", error);

        const errorReason = error?.reason || "Reimbursement errored";
        toast.error(errorReason);
      }
    },
    [address, chainId, contract]
  );
};

export default useReimburseOrg;
