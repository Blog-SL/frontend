'use client';

import { signIn } from "next-auth/react";

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-3xl text-white font-semibold">Register</h1>
      <div className="card p-4 space-y-4">
        <button className="btn btn-primary w-full" onClick={() => signIn('google')}>
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
