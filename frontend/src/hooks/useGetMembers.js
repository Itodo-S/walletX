import { useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { baseSepolia } from "@reown/appkit/networks";

const useGetMembers = () => {
  const contract = useContract(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(async () => {
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
      const members = await contract.getMembers();
      return members;
    } catch (error) {
      console.trace(error);
      console.error("Error fetching members: ", error);
      toast.error("Failed to fetch members");
    }
  }, [address, chainId, contract]);
};

export default useGetMembers;
