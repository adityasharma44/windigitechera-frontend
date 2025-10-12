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
import toast from "react-hot-toast";
import JobService from "@/services/jobs.service";
import EditJob from "./EditJob";

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
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [refreshList, setRefreshList] = useState(false);

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
    }, [page, refresh, refreshList]);

    const handleMove = (num: number) => {
        const newPage = Math.max(page + num, 1);
        router.push(`?page=${newPage}`);
    };

    const handleEditClick = (job: Job) => {
        setSelectedJob(job);
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setSelectedJob(null);
    };

    const handleJobUpdated = () => {
        setRefreshList(!refreshList);
        handleEditModalClose();
    };

    const handleDeleteClick = async (jobId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this job? This action cannot be undone.");
        
        if (!confirmed) return;

        try {
            const res = await fetch(`${API}/api/jobs/deleteJob/${jobId}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();
            
            if (!res.ok) throw new Error(data.message || "Failed to delete job");
            
            toast.success("Job deleted successfully!");
            setRefreshList(!refreshList);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to delete job");
        }
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
            cell: (info) => {
                const stripHtml = (html: string) => {
                    const tmp = document.createElement('div');
                    tmp.innerHTML = html;
                    return tmp.textContent || tmp.innerText || '';
                };
                return (
                    <span className="line-clamp-1">{stripHtml(info.getValue() as string)}</span>
                );
            },
        },
        {
            header: "Applicants",
            accessorKey: "applicants",
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/applicants/${row.original._id}`}
                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                    >
                        View Applicants
                    </Link>
                    <button
                        onClick={() => handleEditClick(row.original)}
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteClick(row.original._id)}
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
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
                ${i === 1 ? "w-1/3" : ""}
                ${i === 2 ? "w-[100px]" : ""}
                ${i === 3 ? "w-[350px]" : ""}
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
                                    <td key={cell.id} className={`px-4 py-2 ${i !== 3 ? 'truncate' : ''}
                ${i === 0 ? "w-[150px]" : ""}
                ${i === 1 ? "w-1/3" : ""}
                ${i === 2 ? "w-[100px]" : ""}
                ${i === 3 ? "w-[350px]" : ""}
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
            <div className="mt-6 flex pb-6 justify-center gap-4">
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

            {/* Edit Job Modal */}
            {showEditModal && selectedJob && (
                <EditJob
                    handleEditModalClose={handleEditModalClose}
                    onJobUpdated={handleJobUpdated}
                    jobData={selectedJob}
                />
            )}
        </section>
    );
};

export default ShowJobList;
