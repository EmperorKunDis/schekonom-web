"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Camera,
  FileText,
  CheckCircle,
  Loader2,
  X,
  Pencil,
} from "lucide-react";
import Tesseract from "tesseract.js";

interface ExtractedData {
  invoiceNumber: string;
  date: string;
  amount: string;
  supplierIco: string;
  vatAmount: string;
  rawText: string;
}

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

// Extract Czech invoice data from OCR text using regex
function extractInvoiceData(text: string): ExtractedData {
  const invoiceNumber =
    text
      .match(/(?:faktura|[čc][ií]slo|doklad)[^\d]*(\d[\d\s/-]+)/i)?.[1]
      ?.trim() ?? "";
  const date =
    text.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)?.[0] ?? "";
  const amount =
    text
      .match(
        /(?:celkem|[čc][aá]stka|k [uú]hrad[eě])[^\d]*([\d\s,.]+)\s*(?:K[čc]|CZK|EUR)/i,
      )?.[1]
      ?.trim() ?? "";
  const supplierIco =
    text.match(/(?:I[ČC][O]?|I[ČC]O)\s*:?\s*(\d{8})/i)?.[1] ?? "";
  const vatAmount =
    text.match(/(?:DPH|da[ňn])[^\d]*([\d\s,.]+)/i)?.[1]?.trim() ?? "";
  return { invoiceNumber, date, amount, supplierIco, vatAmount, rawText: text };
}

export default function DocumentUpload({ onClose }: { onClose?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extracted, setExtracted] = useState<ExtractedData | null>(null);
  const [saved, setSaved] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setSaved(false);
    setExtracted(null);

    // Preview
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }

    // Run OCR
    setProcessing(true);
    setProgress(0);

    try {
      const result = await Tesseract.recognize(f, "ces", {
        logger: (info: { status: string; progress: number }) => {
          if (info.status === "recognizing text") {
            setProgress(Math.round(info.progress * 100));
          }
        },
      });
      const text = result.data.text;
      setExtracted(extractInvoiceData(text));
    } catch {
      setExtracted({
        invoiceNumber: "",
        date: "",
        amount: "",
        supplierIco: "",
        vatAmount: "",
        rawText: "Chyba pri OCR zpracovani.",
      });
    } finally {
      setProcessing(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragActive(false);
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  const handleSave = () => {
    if (!extracted) return;
    alert(
      `Doklad ulozen (demo):\n\nCislo faktury: ${extracted.invoiceNumber || "—"}\nDatum: ${extracted.date || "—"}\nCastka: ${extracted.amount || "—"}\nICO: ${extracted.supplierIco || "—"}\nDPH: ${extracted.vatAmount || "—"}`,
    );
    setSaved(true);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setProcessing(false);
    setProgress(0);
    setExtracted(null);
    setSaved(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="hud-panel p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div style={labelStyle} className="mb-1">
            OCR SKEN
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "1.05rem",
              fontWeight: 600,
            }}
          >
            Nahrát a rozpoznat doklad
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 transition-colors"
            style={{ color: "#7A8A9E" }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Drop zone */}
      {!file && !processing && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className="relative"
          style={{
            border: `2px dashed ${dragActive ? "#00E5FF" : "rgba(0,229,255,0.2)"}`,
            background: dragActive
              ? "rgba(0,229,255,0.04)"
              : "rgba(0,229,255,0.01)",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            transition: "all 0.2s",
            cursor: "pointer",
          }}
          onClick={() => inputRef.current?.click()}
        >
          <Upload
            size={36}
            className="mx-auto mb-3"
            style={{ color: "rgba(0,229,255,0.4)" }}
          />
          <div style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: 6 }}>
            Pretahne te soubor sem
          </div>
          <div style={{ color: "#7A8A9E", fontSize: "0.85rem" }}>
            nebo kliknete pro vyber souboru
          </div>
          <div
            style={{
              color: "#7A8A9E",
              fontSize: "0.75rem",
              marginTop: 8,
              opacity: 0.7,
            }}
          >
            Podporovane: JPG, PNG, TIFF, PDF
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={onInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Camera capture button */}
      {!file && !processing && (
        <div className="flex gap-3">
          <label
            className="hud-button flex items-center gap-2 cursor-pointer"
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Camera size={16} />
            Vyfotit doklad
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onInputChange}
              className="hidden"
            />
          </label>
          <button
            className="hud-button-secondary flex items-center gap-2"
            style={{ flex: 1, justifyContent: "center" }}
            onClick={() => inputRef.current?.click()}
          >
            <Upload size={16} />
            Vybrat soubor
          </button>
        </div>
      )}

      {/* Processing state */}
      {processing && (
        <div className="py-8 text-center space-y-4">
          <Loader2
            size={32}
            className="mx-auto animate-spin"
            style={{ color: "#00E5FF" }}
          />
          <div style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "1rem" }}>
            Zpracovani OCR... {progress}%
          </div>
          {/* Progress bar */}
          <div
            style={{
              background: "rgba(0,229,255,0.08)",
              height: 6,
              width: "100%",
              maxWidth: 320,
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background:
                  "linear-gradient(90deg, #00E5FF 0%, rgba(0,229,255,0.6) 100%)",
                transition: "width 0.3s ease",
                boxShadow: "0 0 12px rgba(0,229,255,0.4)",
              }}
            />
          </div>
          <div style={{ color: "#7A8A9E", fontSize: "0.82rem" }}>
            Rozpoznavani ceskeho textu pomoci Tesseract.js
          </div>
        </div>
      )}

      {/* Results */}
      {extracted && !processing && (
        <div className="space-y-5">
          {/* Preview + raw text */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Image preview */}
            {preview && (
              <div>
                <div style={labelStyle} className="mb-2">
                  NAHLED
                </div>
                <div
                  style={{
                    background: "rgba(0,229,255,0.02)",
                    border: "1px solid rgba(0,229,255,0.1)",
                    padding: 8,
                    maxHeight: 280,
                    overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Document preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: 260,
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            )}
            {/* Raw OCR text */}
            <div>
              <div style={labelStyle} className="mb-2">
                ROZPOZNANY TEXT
              </div>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(0,229,255,0.1)",
                  padding: 12,
                  fontFamily: "SF Mono, Monaco, Consolas, monospace",
                  fontSize: "0.75rem",
                  color: "#B8C1C8",
                  lineHeight: 1.6,
                  maxHeight: 280,
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {extracted.rawText || "Zadny text nebyl rozpoznan."}
              </div>
            </div>
          </div>

          {/* Extracted fields */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Pencil size={14} style={{ color: "#00E5FF" }} />
              <span style={labelStyle}>EXTRAHOVANA DATA</span>
              <span
                style={{
                  color: "#7A8A9E",
                  fontSize: "0.72rem",
                  fontStyle: "italic",
                }}
              >
                — upravte, pokud je treba
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  key: "invoiceNumber" as const,
                  label: "Cislo faktury",
                  placeholder: "FV-2026/001",
                },
                {
                  key: "date" as const,
                  label: "Datum",
                  placeholder: "01.04.2026",
                },
                {
                  key: "amount" as const,
                  label: "Castka",
                  placeholder: "12 500,00 Kc",
                },
                {
                  key: "supplierIco" as const,
                  label: "ICO dodavatele",
                  placeholder: "12345678",
                },
                {
                  key: "vatAmount" as const,
                  label: "DPH",
                  placeholder: "2 625,00",
                },
              ].map((field) => (
                <div key={field.key}>
                  <div style={labelStyle} className="mb-1">
                    {field.label}
                  </div>
                  <input
                    className="hud-input"
                    placeholder={field.placeholder}
                    value={extracted[field.key]}
                    onChange={(e) =>
                      setExtracted((prev) =>
                        prev ? { ...prev, [field.key]: e.target.value } : prev,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {!saved ? (
              <button
                className="hud-button flex items-center gap-2"
                onClick={handleSave}
              >
                <CheckCircle size={16} />
                Potvrdit a ulozit
              </button>
            ) : (
              <div
                className="flex items-center gap-2"
                style={{ color: "#00E5A0" }}
              >
                <CheckCircle size={18} />
                <span style={{ fontWeight: 600 }}>Ulozeno (demo)</span>
              </div>
            )}
            <button
              className="hud-button-secondary flex items-center gap-2"
              onClick={reset}
            >
              <FileText size={16} />
              Novy doklad
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
