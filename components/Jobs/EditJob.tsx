"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import toast, { Toaster } from "react-hot-toast";

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineLink,
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
  AiOutlineCode,
} from "react-icons/ai";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

const labelClass = "block mb-2 text-sm font-medium text-gray-900";
const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
  "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
const buttonClass =
  "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none " +
  "focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

type EditJobProps = {
  handleEditModalClose: () => void;
  onJobUpdated: () => void;
  jobData: {
    _id: string;
    title: string;
    description: string;
  };
};

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const EditJob = ({ handleEditModalClose, onJobUpdated, jobData }: EditJobProps) => {
  const [formData, setFormData] = useState({ title: jobData.title, description: jobData.description });
  const [loading, setLoading] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'list-disc pl-6 my-2',
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'list-decimal pl-6 my-2',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'my-1',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'my-2',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-300 pl-4 italic my-2 text-gray-700',
          },
        },
        code: {
          HTMLAttributes: {
            class: 'bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600',
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-[156px] bg-white py-2 px-3 focus:outline-none text-gray-900",
        style: "border: none !important; outline: none !important;",
      },
    },
    content: jobData.description,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, description: editor.getHTML() }));
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
      const res = await fetch(`${API}/api/jobs/updateJob/${jobData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update job");
      
      toast.success("Job updated successfully!");
      onJobUpdated();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-3xl h-[90vh] flex flex-col">
        <div className="relative rounded-lg border border-gray-300 bg-white shadow-md flex flex-col h-full">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-900">Edit Job</h3>
            <button
              type="button"
              onClick={handleEditModalClose}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className={labelClass}>
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., Senior React Developer"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Job Description</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`p-2 rounded transition-colors ${
                      editor?.isActive('bold') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                    title="Bold"
                  >
                    <AiOutlineBold className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded transition-colors ${
                      editor?.isActive('italic') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                    title="Italic"
                  >
                    <AiOutlineItalic className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    className={`p-2 rounded transition-colors ${
                      editor?.isActive('strike') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                    title="Strikethrough"
                  >
                    <AiOutlineStrikethrough className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded transition-colors ${
                      editor?.isActive('bulletList') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                    title="Bullet List"
                  >
                    <AiOutlineUnorderedList className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded transition-colors ${
                      editor?.isActive('orderedList') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                    title="Numbered List"
                  >
                    <AiOutlineOrderedList className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    className={`p-2 rounded transition-colors ${
                      editor?.isActive('blockquote') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                    title="Quote"
                  >
                    <BiSolidQuoteAltLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    className={`p-2 rounded transition-colors ${
                      editor?.isActive('code') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                    title="Inline Code"
                  >
                    <AiOutlineCode className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.prompt('Enter URL:');
                      if (url) {
                        editor?.chain().focus().setLink({ href: url }).run();
                      }
                    }}
                    className={`p-2 rounded transition-colors ${
                      editor?.isActive('link') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                    title="Add Link"
                  >
                    <AiOutlineLink className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto bg-white">
                  <style jsx global>{`
                    .ProseMirror {
                      border: none !important;
                      outline: none !important;
                    }
                    .ProseMirror:focus {
                      outline: none !important;
                    }
                  `}</style>
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? "Updating..." : "Update Job"}
            </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default EditJob;
