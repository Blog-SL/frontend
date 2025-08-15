'use client';

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Profile</h1>
      <pre className="card p-4 overflow-auto">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
