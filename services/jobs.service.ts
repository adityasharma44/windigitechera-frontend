const API = process.env.NEXT_PUBLIC_SERVER_URL;

export type Job = {
    _id: string;
    title: string;
    description: string;
    applicants: number;
};

class JobService {
    static listJobs = async (page: number, debouncedQuery?: string) => {
        const query = debouncedQuery?`&q=${debouncedQuery}` : "";
        try {
            const res = await fetch(
                `${API}/api/jobs/getJobs?page=${page}${query}`,
                { cache: "no-store" }
            );
            const data = await res.json();
            if (!res?.ok) {
                throw new Error(data.message || "Error fetching jobs");
            }
            return { jobs: data.jobs, totalPages: data.totalPages }
        } catch (err) {
            console.error("Error fetching jobs", err);
            return { jobs: [], totalPages: 1 }
        }

    }
}

export default JobService;