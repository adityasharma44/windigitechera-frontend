"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineLink,
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
  AiOutlineCode,
} from "react-icons/ai";

const labelClass = "block mb-2 text-sm font-medium text-gray-900";
const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
  "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
const buttonClass =
  "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none " +
  "focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

type AddJobProps = {
  handleJobModalOpen: () => void;
  onJobAdded: () => void;
};

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const AddJob = ({ handleJobModalOpen, onJobAdded }: AddJobProps) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    immediatelyRender:false,
    extensions: [StarterKit, Link],
    content: formData.description,
    onUpdate: ({ editor }) =>
      setFormData((prev) => ({ ...prev, description: editor.getHTML() })),
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/jobs/addJob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add job");
      onJobAdded();
      setFormData({ title: "", description: "" });
      editor?.commands.setContent("");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40">
      <div className="relative w-full max-w-3xl p-4">
        <div className="relative rounded-lg border border-gray-300 bg-white shadow-md">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4">
            <h3 className="text-xl font-semibold text-gray-900">Add Job</h3>
            <button
              type="button"
              onClick={handleJobModalOpen}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <svg
                className="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClass}>Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="eg. Full Stack Developer"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Job Description</label>
                {/* Toolbar */}
                <div className="mb-2 flex gap-2 border-b pb-2">
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <AiOutlineBold className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <AiOutlineItalic className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().toggleStrike().run()
                    }
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <AiOutlineStrikethrough className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().toggleBulletList().run()
                    }
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <AiOutlineUnorderedList className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().toggleOrderedList().run()
                    }
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <AiOutlineOrderedList className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor?.chain().focus().toggleBlockquote().run()
                    }
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    quote
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <AiOutlineCode className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().setLink({ href: "#" }).run()}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <AiOutlineLink className="h-5 w-5" />
                  </button>
                </div>

                <EditorContent editor={editor} />
              </div>

              <button type="submit" className={buttonClass} disabled={loading}>
                {loading ? "Adding..." : "Add Job"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
