"use client";

import { useState } from "react";
import { Files, Upload, Search, ScanLine } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getCompaniesForProfile, documents } from "@/lib/erp/data";
import DocumentUpload from "@/components/erp/DocumentUpload";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

const fmtDate = new Intl.DateTimeFormat("cs-CZ", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const statusTone: Record<string, string> = {
  processed: "green",
  pending: "gold",
  missing: "red",
  requested: "red",
  uploaded: "cyan",
  archived: "slate",
};

const statusLabel: Record<string, string> = {
  processed: "Zpracováno",
  pending: "Ke zpracování",
  missing: "Chybí",
  requested: "Požadováno",
  uploaded: "Nahráno",
  archived: "Archivováno",
};

export default function DokumentyPage() {
  const { profile } = useAuth();
  const [filterCompany, setFilterCompany] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [showOcr, setShowOcr] = useState(false);

  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  let docs = documents
    .filter((d) => companyIds.has(d.companyId))
    .sort(
      (a, b) =>
        new Date(b.uploadedAt || "").getTime() -
        new Date(a.uploadedAt || "").getTime(),
    );

  if (filterCompany !== "all") {
    docs = docs.filter((d) => d.companyId === filterCompany);
  }
  if (filterStatus !== "all") {
    docs = docs.filter((d) => d.status === filterStatus);
  }
  if (search) {
    const q = search.toLowerCase();
    docs = docs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.type?.toLowerCase().includes(q) ||
        d.type?.toLowerCase().includes(q),
    );
  }

  const statuses = [
    ...new Set(
      documents.filter((d) => companyIds.has(d.companyId)).map((d) => d.status),
    ),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="hud-chip" data-tone="cyan">
              DOKUMENTY
            </span>
            <span className="hud-chip" data-tone="slate">
              {docs.length} záznamů
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
            Správa dokumentů
          </h1>
          <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
            Všechny dokumenty, podklady a přílohy na jednom místě.
          </p>
        </div>
        <div className="flex gap-3 self-start">
          <button
            className="hud-button flex items-center gap-2"
            onClick={() => setShowOcr((v) => !v)}
          >
            <ScanLine size={15} />
            {showOcr ? "Zavřít OCR" : "Nahrát doklad"}
          </button>
          {profile.role === "client" && (
            <button className="hud-button-secondary flex items-center gap-2">
              <Upload size={15} /> Nahrát dokument
            </button>
          )}
        </div>
      </div>

      {/* OCR Upload panel */}
      {showOcr && <DocumentUpload onClose={() => setShowOcr(false)} />}

      {/* Filters */}
      <div className="hud-panel p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <div className="mb-1" style={labelStyle}>
              Hledat
            </div>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                className="hud-input pl-10"
                placeholder="Název, kategorie, typ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mb-1" style={labelStyle}>
              Firma
            </div>
            <select
              className="hud-input"
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              style={{ minWidth: 180 }}
            >
              <option value="all">Všechny firmy</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1" style={labelStyle}>
              Status
            </div>
            <select
              className="hud-input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ minWidth: 150 }}
            >
              <option value="all">Všechny</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {statusLabel[s] || s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents list */}
      <div className="hud-panel p-6">
        <div className="space-y-1">
          {docs.slice(0, 30).map((doc) => (
            <div
              key={doc.id}
              className="hud-list-row hover:border-cyan-500/20 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Files size={16} className="text-cyan flex-shrink-0" />
                <div className="min-w-0">
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                    className="truncate"
                  >
                    {doc.title}
                  </div>
                  <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                    {companies.find((c) => c.id === doc.companyId)?.name} //{" "}
                    {doc.type} // {doc.type}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {doc.uploadedAt && (
                  <span className="hud-time-stamp">
                    {fmtDate.format(new Date(doc.uploadedAt))}
                  </span>
                )}
                <span
                  className="hud-chip"
                  data-tone={statusTone[doc.status] || "slate"}
                >
                  {statusLabel[doc.status] || doc.status}
                </span>
              </div>
            </div>
          ))}
          {docs.length === 0 && (
            <div className="text-center py-12" style={{ color: "#7A8A9E" }}>
              <Files
                size={32}
                className="mx-auto mb-3"
                style={{ color: "rgba(0,229,255,0.2)" }}
              />
              <div>Žádné dokumenty odpovídající filtrům.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
