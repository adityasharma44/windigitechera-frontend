"use client";

import { useEffect, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import JobService from "@/services/jobs.service";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

// Define Job type
type Job = {
    _id: string;
    title: string;
    description: string;
    applicants: number;
};

const ShowJobList = ({refresh}:{refresh:boolean}) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    const searchParams = useSearchParams();
    const router = useRouter();

    const page = parseInt(searchParams.get("page") || "1", 10);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { jobs, totalPages } = await JobService.listJobs(page);
                setJobs(jobs);
                setTotalPages(totalPages);
            } catch (err) {
                console.error("Error fetching jobs", err);
            }
        };
        fetchJobs();
    }, [page,refresh]);

    const handleMove = (num: number) => {
        const newPage = Math.max(page + num, 1);
        router.push(`?page=${newPage}`);
    };

    // Define table columns
    const columns: ColumnDef<Job>[] = [
        {
            header: "Title",
            accessorKey: "title",
        },
        {
            header: "Description",
            accessorKey: "description",
            cell: (info) => (
                <span className="line-clamp-1">{info.getValue() as string}</span>
            ),
        },
        {
            header: "Applicants",
            accessorKey: "applicants",
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <>
                    <Link
                        href={`/admin/applicants/${row.original._id}`}
                        className="rounded bg-blue-600 px-3 py-1 text-white"
                    >
                        View Applicants
                    </Link>
                </>
            ),
        },
    ];

    const table = useReactTable({
        data: jobs,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <section className="pt-4">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full table-fixed border-collapse text-sm">
                    <thead className="bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, i) => (
                                    <th key={header.id} className={`px-4 py-2 text-left
                ${i === 0 ? "w-[150px]" : ""}
                ${i === 1 ? "w-1/2" : ""}
                ${i === 2 ? "w-[120px]" : ""}
                ${i === 3 ? "w-[160px]" : ""}
              `}>
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
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t">
                                {row.getVisibleCells().map((cell, i) => (
                                    <td key={cell.id} className={`px-4 py-2 truncate
                ${i === 0 ? "w-[150px]" : ""}
                ${i === 1 ? "w-1/2" : ""}
                ${i === 2 ? "w-[120px]" : ""}
                ${i === 3 ? "w-[160px]" : ""}
              `}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-4">
                {page > 1 && (
                    <button
                        onClick={() => handleMove(-1)}
                        className="rounded bg-gray-200 px-4 py-2"
                    >
                        Previous
                    </button>
                )}
                <span className="px-4 py-2">
                    Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                    <button
                        onClick={() => handleMove(1)}
                        className="rounded bg-gray-200 px-4 py-2"
                    >
                        Next
                    </button>
                )}
            </div>
        </section>
    );
};

export default ShowJobList;
