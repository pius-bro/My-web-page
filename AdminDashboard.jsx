export default function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: "12,540", change: "+12%" },
    { title: "Revenue", value: "$48,200", change: "+8%" },
    { title: "Orders", value: "1,248", change: "+15%" },
    { title: "Pending Tickets", value: "38", change: "-5%" },
  ];

  const activities = [
    "New user registered",
    "Server backup completed",
    "Payment received from client",
    "System update installed",
    "New support ticket created",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-4">
          <a
            href="#"
            className="block px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="block px-4 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Users
          </a>

          <a
            href="#"
            className="block px-4 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Analytics
          </a>

          <a
            href="#"
            className="block px-4 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Orders
          </a>

          <a
            href="#"
            className="block px-4 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h2>

            <p className="text-gray-500">
              Monitor your system performance and activities.
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            <button className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition">
              Add New
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <p className="text-gray-500 text-sm">{stat.title}</p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {stat.value}
              </h3>

              <span className="text-sm text-green-600 font-medium">
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Orders
              </h3>

              <button className="text-sm text-blue-600 hover:underline">
                View All
              </button>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-gray-500">Order ID</th>
                  <th className="py-3 text-gray-500">Customer</th>
                  <th className="py-3 text-gray-500">Status</th>
                  <th className="py-3 text-gray-500">Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3">#1001</td>
                  <td className="py-3">John Doe</td>
                  <td className="py-3 text-green-600">Completed</td>
                  <td className="py-3">$320</td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3">#1002</td>
                  <td className="py-3">Jane Smith</td>
                  <td className="py-3 text-yellow-600">Pending</td>
                  <td className="py-3">$210</td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3">#1003</td>
                  <td className="py-3">Michael Lee</td>
                  <td className="py-3 text-red-600">Cancelled</td>
                  <td className="py-3">$90</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>

            <ul className="space-y-4">
              {activities.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 border-b pb-3 last:border-none"
                >
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-2"></div>

                  <p className="text-gray-700">{activity}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}