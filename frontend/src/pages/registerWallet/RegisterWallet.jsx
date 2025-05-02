import React, { useState } from "react";
import { IconCheck, IconWallet, IconLoader } from "@tabler/icons-react";
import useRegisterWallet from "../../hooks/useRegisterWallet";

const RegisterWallet = () => {
  const handleRegisterWallet = useRegisterWallet();
  const [wallet, setWallet] = useState({
    walletName: "",
    fundAmount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name, e) => {
    setWallet((preState) => ({ ...preState, [name]: e.target.value }));
  };

  const { walletName, fundAmount } = wallet;

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleRegisterWallet(walletName, fundAmount);
      setIsLoading(false);
    } catch (error) {
      console.error("Error registering wallet:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[hsl(var(--card))] p-8 rounded-xl border border-[hsl(var(--border))] shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))] flex items-center gap-2">
        <IconWallet size={24} />
        Register Wallet
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Wallet Name
          </label>
          <input
            type="text"
            value={walletName}
            onChange={(e) => handleInputChange("walletName", e)}
            placeholder="Enter wallet name"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Fund Amount
          </label>
          <input
            type="number"
            value={fundAmount}
            onChange={(e) => handleInputChange("fundAmount", e)}
            placeholder="Enter amount to fund"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            className="border border-[hsl(var(--primary))] text-[hsl(var(--primary))] px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.05)] transition disabled:opacity-50 flex items-center gap-2"
            onClick={handleRegisterClick}
            disabled={isLoading}
          >
            {isLoading && (
              <IconLoader size={18} className="animate-spin" />
            )}
            {isLoading ? "Registering..." : "Register Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterWallet;
