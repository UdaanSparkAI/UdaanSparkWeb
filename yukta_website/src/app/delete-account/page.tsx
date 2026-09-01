import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { DeleteAccountForm } from "@/components/ui/DeleteAccountForm";

export const metadata: Metadata = generatePageMetadata({
  title: "Delete Account",
  description:
    "Submit a request to permanently delete your YUKTA AI account and all associated data. Requests are processed within 30 days.",
  path: "/delete-account",
  noIndex: true,
});

export default function DeleteAccountPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-red-500 font-semibold text-sm uppercase tracking-widest mb-2">
          Account Management
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-3">
          Delete Your Account
        </h1>
        <p className="text-muted leading-relaxed">
          We&apos;re sorry to see you go. Submitting this form will permanently delete your YUKTA AI
          account and all associated data within 30 days.
        </p>
      </div>

      {/* Warning box */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
        <h2 className="text-red-700 font-semibold text-sm mb-2">⚠ This action is irreversible</h2>
        <ul className="text-red-600 text-sm space-y-1">
          <li>• Your account and login credentials will be permanently removed</li>
          <li>• Your shopping history and saved preferences will be deleted</li>
          <li>• You will lose access to all personalised features</li>
          <li>• This cannot be undone after processing</li>
        </ul>
      </div>

      {/* Form — client component */}
      <DeleteAccountForm />
    </div>
  );
}
