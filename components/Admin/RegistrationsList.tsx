"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import RegistrationDetailsModal from "./RegistrationDetailsModal";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

type Registration = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  yearsOfExp: number;
  degree: string;
  detailsOfSkills: string;
  address: string;
  country: string;
  yearOfPassing: number;
  gender: string;
  maritalStatus: string;
  resumeFile: string;
  createdAt: string;
};

const RegistrationsList = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch(`${API}/api/application/getRegistrations`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.status === "success") {
          setRegistrations(data.registrations);
        }
      } catch (err) {
        console.error("Error fetching registrations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const columns: ColumnDef<Registration>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) => (
        <span className="font-medium text-gray-900">{info.getValue() as string}</span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "City",
      accessorKey: "city",
    },
    {
      header: "Experience",
      accessorKey: "yearsOfExp",
      cell: (info) => `${info.getValue()} years`,
    },
    {
      header: "Degree",
      accessorKey: "degree",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => setSelectedRegistration(row.original)}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          View Details
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: registrations,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-600">Loading registrations...</p>
      </div>
    );
  }

  return (
    <section className="pt-4">
      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search by name, email, city, degree..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="text-sm text-gray-600">
          Total: {registrations.length} registrations
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold text-gray-700"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRegistration && (
        <RegistrationDetailsModal
          registration={selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
        />
      )}
    </section>
  );
};

export default RegistrationsList;
