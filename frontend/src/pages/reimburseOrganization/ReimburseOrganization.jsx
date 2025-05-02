import React, { useState } from "react";
import { IconBuildingBank, IconLoader } from "@tabler/icons-react";
import useReimburseOrg from "../../hooks/useReimburseOrg";

const ReimburseOrganization = () => {
  const [reimburseAmount, setReimburseAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const reimburseOrg = useReimburseOrg();

  const handleReimburse = async () => {
    if (!reimburseAmount) {
      console.error("Reimbursement amount is required");
      return;
    }
    setIsLoading(true);
    try {
      await reimburseOrg(reimburseAmount);
      setIsLoading(false);
    } catch (error) {
      console.error("Error reimbursing organization:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[hsl(var(--card))] p-8 rounded-xl border border-[hsl(var(--border))] shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))] flex items-center gap-2">
        <IconBuildingBank size={24} />
        Reimburse Organization
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Fund Amount
          </label>
          <input
            type="number"
            value={reimburseAmount}
            onChange={(e) => setReimburseAmount(e.target.value)}
            placeholder="Enter amount to reimburse"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleReimburse}
            disabled={isLoading}
            className="border border-[hsl(var(--primary))] text-[hsl(var(--primary))] px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.05)] transition disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && <IconLoader size={18} className="animate-spin" />}
            {isLoading ? "Reimbursing..." : "Reimburse"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReimburseOrganization;
