import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";

const useGetMemberTransactions = () => {
    const contract = useContract();
    const [transactions, setTransactions] = useState([]);

    const fetchMemberTransactions = useCallback(async () => {
        if (!contract) {
            toast.error("Contract not initialized!");
            return;
        }

        try {
            const memberTransactions = await contract.getMemberTransactions();
            setTransactions(memberTransactions);
        } catch (error) {
            console.error("Error fetching member transactions:", error);
            toast.error("Failed to fetch member transactions.");
        }
    }, [contract]);

    return { transactions, fetchMemberTransactions };
};

export default useGetMemberTransactions;
