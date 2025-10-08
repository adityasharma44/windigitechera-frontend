"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useParams } from "next/navigation";
import ApplicantDetailModal, { Applicant } from "@/components/Jobs/ApplicantDetailModal";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const ApplicantsList = () => {
  const [applications, setApplications] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams()
  const [showApplicantDetails, setShowApplicantDetails] = useState(false)
  const [applicantData, setApplicantData] = useState<Applicant | null>(null)

  const handleClose = () => {
    setShowApplicantDetails(!showApplicantDetails)
  }

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API}/api/application/getApplications/${id}`,
          {
            cache: "no-store",
          }
        );
        const data = await res.json();
        setApplications(data.applications || []); // adjust according to API response shape
      } catch (err) {
        console.error("Error fetching applications", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchApplications();
  }, [id]);

  // Define table columns
  const columns: ColumnDef<Applicant>[] = [
    {
      header: "Name",
      accessorKey: "name",
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
      cell: (info) => (
        <span className="line-clamp-2 capitalize">{info.getValue() as string}</span>
      )
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => { setApplicantData(row?.original); handleClose(); }}
          className="rounded bg-blue-600 px-3 py-1 text-white"
        >
          View Details
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: applications,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="pt-28 md:pt-[150px] container">
      {
        showApplicantDetails && <ApplicantDetailModal handleClose={handleClose} applicant={applicantData} />
      }
      {loading ? (
        <p className="text-center">Loading applications...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-2 text-left">
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
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No applications found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ApplicantsList;
