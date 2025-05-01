import React from "react";

// Mock data — we go replace with actual fetched data
const userRole = "admin"; // or "member"
const walletName = "XWallet Master";
const organizationName = "Cantana Org";
const walletBalance = "12.45 ETH";
const memberSpendLimit = "3.00 ETH";
const walletAddress = "0x1234...ABCD";

const transactions = [
  {
    id: 1,
    type: "Sent",
    amount: "0.50 ETH",
    to: "0xABCD...1234",
    date: "2025-04-30",
  },
  {
    id: 2,
    type: "Received",
    amount: "1.25 ETH",
    from: "0x5678...EF90",
    date: "2025-04-29",
  },
  {
    id: 3,
    type: "Sent",
    amount: "0.75 ETH",
    to: "0x9999...FFFF",
    date: "2025-04-28",
  },
];

const members = [
  { id: 1, name: "Alice Johnson", role: "Member", wallet: "0xA1B2...C3D4" },
  { id: 2, name: "Bob Smith", role: "Member", wallet: "0xE5F6...G7H8" },
  { id: 3, name: "Jane Doe", role: "Member", wallet: "0xI9J0...K1L2" },
];

const Dashboard = () => {
  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))]">
        Welcome, {userRole === "admin" ? "Admin" : "Member"}
      </h2>

      {/* Info Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card
          title={userRole === "admin" ? "Wallet Name" : "Organization Name"}
        >
          {userRole === "admin" ? walletName : organizationName}
        </Card>

        <Card
          title={userRole === "admin" ? "Wallet Balance" : "Your Spend Limit"}
        >
          {userRole === "admin" ? walletBalance : memberSpendLimit}
        </Card>

        <Card title="Role" className="capitalize">
          {userRole}
        </Card>

        <Card title="Wallet Address" colSpanFull>
          <span className="text-sm font-mono">{walletAddress}</span>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">
          Recent Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-[hsl(var(--border))] rounded-lg overflow-hidden">
            <thead className="bg-[hsl(var(--card))] text-[hsl(var(--muted-text))]">
              <tr>
                <th className="text-left p-3 border-b border-[hsl(var(--border))]">
                  Type
                </th>
                <th className="text-left p-3 border-b border-[hsl(var(--border))]">
                  Amount
                </th>
                <th className="text-left p-3 border-b border-[hsl(var(--border))]">
                  To/From
                </th>
                <th className="text-left p-3 border-b border-[hsl(var(--border))]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="bg-[hsl(var(--card))] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))] transition"
                >
                  <td className="p-3">{tx.type}</td>
                  <td className="p-3">{tx.amount}</td>
                  <td className="p-3">{tx.to || tx.from}</td>
                  <td className="p-3">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

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
                  backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[hsl(var(--foreground))] to-transparent opacity-10 pointer-events-none"></div>
                <h4 className="font-medium text-[hsl(var(--foreground))] mb-2">
                  {member.name}
                </h4>
                <p className="text-sm text-[hsl(var(--muted-text))] mb-1">
                  Role: {member.role}
                </p>
                <p className="text-sm text-[hsl(var(--muted-text))] break-words">
                  Wallet: {member.wallet}
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
      backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
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
