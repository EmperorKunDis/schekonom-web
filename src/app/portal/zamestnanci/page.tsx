"use client";

import { Users, Star, Briefcase, Award } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { schEmployees } from "@/lib/erp/data";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

export default function ZamestnanciPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  if (profile.role !== "owner") {
    return (
      <div className="hud-panel p-6">
        <div className="text-center py-12" style={{ color: "#7A8A9E" }}>
          <Users
            size={32}
            className="mx-auto mb-3"
            style={{ color: "rgba(0,229,255,0.2)" }}
          />
          <div>Tato sekce je dostupná pouze pro majitele.</div>
        </div>
      </div>
    );
  }

  const employees = schEmployees || [];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="gold">
            OWNER ONLY
          </span>
          <span className="hud-chip" data-tone="cyan">
            HR
          </span>
        </div>
        <h1
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            color: "#FFFFFF",
            fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          Zaměstnanci SCH-EKONOM
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Přehled týmu, specializací a výkonnostních metrik.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="hud-metric-card" data-tone="cyan">
          <div className="mb-2 flex items-center gap-2">
            <Users size={14} className="text-cyan" />
            <span style={labelStyle}>Celkem zaměstnanců</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {employees.length}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="green">
          <div className="mb-2 flex items-center gap-2">
            <Star size={14} className="text-status-green" />
            <span style={labelStyle}>Průměrné hodnocení</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {employees.length > 0
              ? (
                  employees.reduce((s, e) => s + (e.avgDocsPerHour || 0), 0) /
                  employees.length
                ).toFixed(1)
              : "N/A"}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="slate">
          <div className="mb-2 flex items-center gap-2">
            <Briefcase size={14} className="text-cyan" />
            <span style={labelStyle}>Specializací</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {new Set(employees.map((e) => e.department)).size}
          </div>
        </div>
      </div>

      {/* Employee cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {employees.map((emp) => (
          <div key={emp.id} className="hud-panel p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(212,175,55,0.1))",
                    border: "2px solid rgba(0,229,255,0.2)",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#00E5FF",
                  }}
                >
                  {emp.name.split(" ")[0]?.[0]}
                  {emp.name.split(" ").slice(1).join(" ")?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {emp.name.split(" ")[0]}{" "}
                    {emp.name.split(" ").slice(1).join(" ")}
                  </div>
                  <div style={{ color: "#7A8A9E", fontSize: "0.82rem" }}>
                    {emp.position}
                  </div>
                </div>
              </div>
              {emp.avgDocsPerHour != null && (
                <div className="flex items-center gap-1">
                  <Award
                    size={14}
                    style={{
                      color:
                        emp.avgDocsPerHour >= 4
                          ? "#00E5A0"
                          : emp.avgDocsPerHour >= 3
                            ? "#E6C65C"
                            : "#FF7B7B",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 700,
                      color:
                        emp.avgDocsPerHour >= 4
                          ? "#00E5A0"
                          : emp.avgDocsPerHour >= 3
                            ? "#E6C65C"
                            : "#FF7B7B",
                    }}
                  >
                    {emp.avgDocsPerHour.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {emp.clientIds && emp.clientIds.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {emp.clientIds.map((spec) => (
                  <span key={spec} className="hud-chip" data-tone="slate">
                    {spec}
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="hud-mini-metric" data-tone="slate">
                <div
                  className="mb-1"
                  style={{ ...labelStyle, fontSize: "0.55rem" }}
                >
                  Klienti
                </div>
                <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                  {emp.clientIds?.length || 0}
                </div>
              </div>
              <div className="hud-mini-metric" data-tone="slate">
                <div
                  className="mb-1"
                  style={{ ...labelStyle, fontSize: "0.55rem" }}
                >
                  Certifikáty
                </div>
                <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                  {emp.clientIds?.length || 0}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="hud-panel p-6">
          <div className="text-center py-12" style={{ color: "#7A8A9E" }}>
            <Users
              size={32}
              className="mx-auto mb-3"
              style={{ color: "rgba(0,229,255,0.2)" }}
            />
            <div>Žádní zaměstnanci v systému.</div>
          </div>
        </div>
      )}
    </div>
  );
}
