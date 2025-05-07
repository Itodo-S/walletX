import React, { useCallback, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useContract from "../../hooks/useContract";
import { useAppKitAccount } from "@reown/appkit/react";

const Dashboard = () => {
  const { address: connectedWalletAddress } = useAppKitAccount();
  const userRole = connectedWalletAddress ? "admin" : "member";
  const [members, setMembers] = useState([]);
  const [memberInfo, setMemberInfo] = useState(null);
  const [walletInfo, setWalletInfo] = useState({
    walletName: "",
    walletBalance: "",
    organizationName: "",
    memberSpendLimit: "",
  });

  const readOnlyOnboardContract = useContract(true);

  const fetchMembers = useCallback(async () => {
    if (!readOnlyOnboardContract) return;

    try {
      const data = await readOnlyOnboardContract.getMembers();
      const result = await data.toArray();

      const parsedMembers = result.map((member) => ({
        id: member[0],
        name: member[2],
      }));

      console.log("result:", result);

      setMembers(parsedMembers);
    } catch (error) {
      console.log("Error fetching members: ", error);
    }
  }, [readOnlyOnboardContract]);

  const fetchWalletInfo = useCallback(async () => {
    if (!readOnlyOnboardContract) return;

    try {
      const adminInfo = await readOnlyOnboardContract.getWalletAdmin();
      const balance = adminInfo.walletBalance;
      setWalletInfo({
        walletName: adminInfo.walletName,
        walletBalance: `${balance} ETH`,
        organizationName: adminInfo.organizationName || "N/A",
        memberSpendLimit: "N/A",
      });
    } catch (error) {
      console.log("Error fetching wallet info: ", error);
    }
  }, [readOnlyOnboardContract]);

  const fetchMemberInfo = useCallback(async () => {
    if (!readOnlyOnboardContract) return;
  
    try {
      const info = await readOnlyOnboardContract.getMember();
      console.log("Member Info:", info);
  
      const parsedInfo = {
        address: info[0],
        firstName: info[1],
        lastName: info[2],
        isActive: info[3],
        spendLimit: info[4], // BigInt
        role: info[6],
      };
  
      setMemberInfo(parsedInfo);
    } catch (error) {
      console.log("Error fetching member info: ", error);
    }
  }, [readOnlyOnboardContract]);
  

  useEffect(() => {
    fetchMembers();
    fetchWalletInfo();
    fetchMemberInfo(); // Fetch and log member info
  }, [fetchMembers, fetchWalletInfo, fetchMemberInfo]);

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        Welcome, {userRole === "admin" ? "Admin" : "Member"}
      </h2>

      {/* Info Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card
          title={userRole === "admin" ? "Wallet Name" : "Organization Name"}
        >
          {userRole === "admin"
            ? walletInfo.walletName
            : walletInfo.organizationName}
        </Card>

        <Card
          title={userRole === "admin" ? "Wallet Balance" : "Your Spend Limit"}
        >
          {userRole === "admin"
            ? walletInfo.walletBalance
            : walletInfo.memberSpendLimit}
        </Card>

        <Card title="Role" className="capitalize">
          {userRole}
        </Card>

        <Card title="Wallet Address" colSpanFull>
          <span className="text-sm font-mono">
            {connectedWalletAddress
              ? `${connectedWalletAddress.slice(
                  0,
                  6
                )}...${connectedWalletAddress.slice(-4)}`
              : "Not Connected"}
          </span>
        </Card>
      </div>

      {/* Member List */}
      {userRole === "admin" && (
        <section>
          <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">
            Members
          </h3>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <li
                key={member.id}
                className="relative bg-[hsl(var(--card))] p-5 rounded-lg border border-[hsl(var(--border))] shadow"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[hsl(var(--foreground))] to-transparent opacity-10 pointer-events-none"></div>
                <h4 className="font-medium text-[hsl(var(--foreground))] mb-2">
                  {member.name}
                </h4>
                <p className="text-sm text-[hsl(var(--muted-text))] mb-1">
                  Role: Member
                </p>
                <p className="text-sm text-[hsl(var(--muted-text))] break-words">
                  Wallet: {`${member.id.slice(0, 6)}...${member.id.slice(-4)}`}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

const Card = ({ title, children, className = "", colSpanFull = false }) => (
  <div
    className={`relative bg-[hsl(var(--card))] p-6 rounded-xl shadow border border-[hsl(var(--border))] ${
      colSpanFull ? "col-span-full lg:col-span-1" : ""
    }`}
    style={{
      backgroundImage:
        "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
    }}
  >
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[hsl(var(--foreground))] to-transparent opacity-10 pointer-events-none"></div>
    <p className="text-sm text-[hsl(var(--muted-text))] mb-1">{title}</p>
    <p
      className={`text-lg font-medium text-[hsl(var(--foreground))] ${className}`}
    >
      {children}
    </p>
  </div>
);

export default Dashboard;
