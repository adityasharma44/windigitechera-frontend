"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const API = process.env.NEXT_PUBLIC_SERVER_URL;
const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
    "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " +
    "dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white";

const buttonClass =
    "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none " +
    "focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " +
    "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

const labelClass =
    "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(
                `${API}/api/auth/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }

            );
            if (res.status === 200) {
                console.log("success login", router.push, "gfhfghfgh");
                router.push("/admin");
            }
        }
        catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="pt-28 lg:pt-[100px] container flex justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
                <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
                    Admin Login
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className={labelClass}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className={labelClass}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button type="submit" className={buttonClass} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AdminLogin;
