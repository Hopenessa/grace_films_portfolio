import { useEffect, useRef, useState } from "react";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
} from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Viewer } from "./PdfPreview.styles";
GlobalWorkerOptions.workerSrc = workerUrl;
export default function PdfPreview({
  url,
  page,
  onLoad,
  warm = false,
  bolder = false,
}: {
  warm?: boolean;
  bolder?: boolean;
  url: string;
  page: number;
  onLoad: (count: number) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    setDocument(null);
    setError(false);
    setLoading(true);
    const task = getDocument(url);
    task.promise
      .then((pdf) => {
        if (alive) {
          setDocument(pdf);
          onLoad(pdf.numPages);
        }
      })
      .catch(() => {
        if (alive) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      alive = false;
      void task.destroy();
    };
  }, [url, onLoad]);
  useEffect(() => {
    if (!document) return;
    let cancelled = false;
    let restoreTextRendering: (() => void) | undefined;
    let renderTask:
      | ReturnType<Awaited<ReturnType<PDFDocumentProxy["getPage"]>>["render"]>
      | undefined;
    setLoading(true);
    document
      .getPage(page)
      .then((pdfPage) => {
        const el = canvas.current;
        if (cancelled || !el) return;
        const viewport = pdfPage.getViewport({ scale: Math.max(2, window.devicePixelRatio) });
        el.width = viewport.width;
        el.height = viewport.height;
        const context = el.getContext("2d")!;
        if (bolder) {
          const fillText = context.fillText;
          // Stroke each text glyph without changing the PDF's character spacing.
          context.fillText = function (text, x, y, maxWidth) {
            this.save();
            this.strokeStyle = this.fillStyle;
            this.lineWidth = 0.45;
            this.lineJoin = "round";
            if (maxWidth === undefined) this.strokeText(text, x, y);
            else this.strokeText(text, x, y, maxWidth);
            this.restore();
            if (maxWidth === undefined) fillText.call(this, text, x, y);
            else fillText.call(this, text, x, y, maxWidth);
          };
          restoreTextRendering = () => { context.fillText = fillText; };
        }
        renderTask = pdfPage.render({
          canvasContext: context,
          viewport,
        });
        return renderTask.promise;
      })
      .then(() => {
        if (!cancelled) setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
      renderTask?.cancel();
      restoreTextRendering?.();
    };
  }, [document, page, bolder]);
  return (
    <Viewer aria-busy={loading} $warm={warm}>
      {error ? (
        <p>
          Unable to load the preview.{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
        </p>
      ) : (
        <>
          {loading && <p role="status">Loading screenplay...</p>}
          <canvas
            ref={canvas}
            role="img"
            aria-label={`Screenplay preview, page ${page}`}
            style={{ display: loading ? "none" : "block" }}
          />
        </>
      )}
    </Viewer>
  );
}
