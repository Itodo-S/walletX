import { useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import useTokenContract from "./useTokenContract";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { baseSepolia } from "@reown/appkit/networks";
import { parseUnits } from "ethers";

const useOnboardMember = () => {
  const contract = useContract(true);
  const tokenContract = useTokenContract(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (memberAddress, memberName, fundAmount, memberIdentifier) => {
      if (!memberAddress || !memberName || !fundAmount || !memberIdentifier) {
        toast.error("Missing field(s)");
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
        const parsedPayment = parseUnits(fundAmount.toString(), 18);

        const approveToken = await tokenContract.approve(
          "0x3f4d0Fc9a72dcEDd31Df0255dC9a371C4624595A",
          parsedPayment
        );

        const tokenReceipt = await approveToken.wait();

        const parsedAmount = parseUnits(fundAmount.toString(), 18);

        const estimatedGas = await contract.onboardMembers.estimateGas(
          memberAddress,
          memberName,
          parsedAmount,
          memberIdentifier
        );
        const tx = await contract.onboardMembers(
          memberAddress,
          memberName,
          parsedAmount,
          memberIdentifier,
          {
            gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
          }
        );
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Member onboarded successfully");
          return;
        }
        toast.error("Onboarding member failed");
        return;
      } catch (error) {
        console.trace(error);
        console.error("Error while onboarding member: ", error);

        // Extract and display the reason if available
        const errorReason = error?.reason || "Onboarding member errored";
        toast.error(errorReason);
      }
    },
    [address, chainId, contract]
  );
};

export default useOnboardMember;
