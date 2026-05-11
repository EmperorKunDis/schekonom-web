"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight, Lock, Shield } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useAuth } from "@/lib/auth/context";
import { demoProfiles } from "@/lib/demo/data";
import { STATIC_LOGIN_PASSWORD } from "@/lib/demo/api";
import { buildWorkspaceSnapshot } from "@/lib/demo/data";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (password.trim() !== STATIC_LOGIN_PASSWORD) {
      setError("Heslo nesouhlasí.");
      return;
    }

    setIsSubmitting(true);
    const profile = demoProfiles[0];
    login({
      token: `demo_${profile.id}_${Date.now()}`,
      user: profile,
      workspace: buildWorkspaceSnapshot(profile),
    });
    router.push("/portal");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "radial-gradient(circle at top right, rgba(0,229,255,0.08), transparent 32%), linear-gradient(180deg, #02060A 0%, #03080D 45%, #091724 100%)",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="hud-panel p-8"
        style={{ width: "100%", maxWidth: 440 }}
      >
        <div className="mb-6 flex items-center justify-center">
          <Logo size={48} showText={true} />
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center"
            style={{
              border: "1px solid rgba(212,175,55,0.22)",
              background: "rgba(212,175,55,0.06)",
            }}
          >
            <Lock size={18} color="rgba(212,175,55,0.92)" />
          </div>
          <div>
            <div style={labelStyle}>LOGIN</div>
            <div style={{ color: "#FFFFFF", fontSize: "0.95rem" }}>
              Zadejte heslo pro přístup
            </div>
          </div>
        </div>

        <label className="block">
          <span style={labelStyle}>Heslo</span>
          <input
            className="hud-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            autoFocus
          />
        </label>

        <button
          className="hud-button mt-5 w-full justify-center"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Otevírám..." : "Vstoupit"}
          <ArrowRight size={15} />
        </button>

        {error && (
          <div className="hud-inline-alert mt-5">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div
          className="mt-6 flex items-center gap-2"
          style={{ color: "#7A8A9E", fontSize: "0.78rem" }}
        >
          <Shield size={14} />
          <span>SCH-EKONOM Control Center · demo přístup</span>
        </div>
      </form>
    </div>
  );
}
