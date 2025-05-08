import React, { useState, useEffect } from "react";
import useMemberWithdrawal from "../../hooks/useMemberWithdrawal";
import useGetMemberTransactions from "../../hooks/useGetMemberTransactions";
import { IconLoader } from "@tabler/icons-react";
import { useAppKitAccount } from "@reown/appkit/react";

const Spending = () => {
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(false);
  const memberWithdrawal = useMemberWithdrawal();
  const { transactions, fetchMemberTransactions } = useGetMemberTransactions();
  const { address } = useAppKitAccount();

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await memberWithdrawal(amount, receiver);

      // Reset form after success
      setAmount("");
      setReceiver("");
    } catch (error) {
      console.error("Withdrawal failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (address) {
        const response = await fetchMemberTransactions(address);
        console.log("Member Transactions Response:", response);
      } else {
        console.error("No connected address found.");
      }
    };

    fetchTransactions();
  }, [address]);

  return (
    <div className="max-w-xl mx-auto bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-[hsl(var(--foreground))]">
        Spend From Wallet
      </h2>

      <form onSubmit={handleWithdraw} className="space-y-5">
        <div>
          <label
            htmlFor="receiver"
            className="block mb-2 text-sm font-medium text-[hsl(var(--muted-text))]"
          >
            Receiver Address
          </label>
          <input
            type="text"
            id="receiver"
            placeholder="0x..."
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-[hsl(var(--muted-text))]"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="border border-[hsl(var(--primary))] w-full text-[hsl(var(--primary))] px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.05)] transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <IconLoader size={18} className="animate-spin" />}
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </form>
    </div>
  );
};

export default Spending;
