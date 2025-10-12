"use client";

import { useEffect, useState, Suspense } from "react";
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

type Job = {
    _id: string;
    title: string;
    description: string;
    applicants: number;
};

// Inner component that uses useSearchParams
function ShowJobListContent({ refresh }: { refresh: boolean }) {
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
        const confirmed = window.confirm(
            "Are you sure you want to delete this job? This action cannot be undone."
        );
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
                    const tmp = document.createElement("div");
                    tmp.innerHTML = html;
                    return tmp.textContent || tmp.innerText || "";
                };
                return <span className="line-clamp-1">{stripHtml(info.getValue() as string)}</span>;
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
            {/* Table and pagination JSX remains unchanged */}
            {/* ... */}
        </section>
    );
}

// Export the same component name wrapped in Suspense
export default function ShowJobList(props: { refresh: boolean }) {
    return (
        <Suspense fallback={<div className="text-center py-10">Loading jobs...</div>}>
            <ShowJobListContent {...props} />
        </Suspense>
    );
}
