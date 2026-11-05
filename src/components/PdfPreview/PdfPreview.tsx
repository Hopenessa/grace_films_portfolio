import { useEffect, useRef, useState } from "react";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
} from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { ScreenReaderText } from "../Shared/ScreenReaderText/ScreenReaderText";
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
  const [pageText, setPageText] = useState("");
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
    setPageText("");
    document
      .getPage(page)
      .then(async (pdfPage) => {
        const text = await pdfPage.getTextContent();
        if (cancelled) return;
        setPageText(
          text.items
            .map((item) =>
              "str" in item ? item.str + (item.hasEOL ? "\n" : " ") : "",
            )
            .join(""),
        );
        const el = canvas.current;
        if (cancelled || !el) return;
        const viewport = pdfPage.getViewport({
          scale: Math.max(2, window.devicePixelRatio),
        });
        el.width = viewport.width;
        el.height = viewport.height;
        const context = el.getContext("2d")!;
        if (bolder) {
          const fillText = context.fillText;
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
          restoreTextRendering = () => {
            context.fillText = fillText;
          };
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
          {!loading && (
            <ScreenReaderText
              role="document"
              aria-label={`Screenplay text, page ${page}`}
            >
              {pageText ||
                "This page contains an image with no extractable text."}
            </ScreenReaderText>
          )}
          <canvas
            ref={canvas}
            aria-hidden="true"
            style={{ display: loading ? "none" : "block" }}
          />
        </>
      )}
    </Viewer>
  );
}
