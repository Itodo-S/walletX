import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";

const useGetMemberTransactions = () => {
    const contract = useContract();
    const [transactions, setTransactions] = useState([]);

    const fetchMemberTransactions = useCallback(async (memberAddress) => {
        if (!contract) {
            toast.error("Contract not initialized!");
            return;
        }

        if (!memberAddress) {
            toast.error("Member address is required!");
            return;
        }

        try {
            const memberTransactions = await contract.getMemberTransactions(memberAddress);
            setTransactions(memberTransactions);
        } catch (error) {
            console.error("Error fetching member transactions:", error);
            toast.error("Failed to fetch member transactions.");
        }
    }, [contract]);

    return { transactions, fetchMemberTransactions };
};

export default useGetMemberTransactions;
