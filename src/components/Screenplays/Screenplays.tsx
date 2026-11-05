import { useState, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import { FileText, Download, ChevronLeft, ChevronRight, Maximize2, X, Minus, Plus, RotateCcw } from "lucide-react";
import { screenplays } from "../../data/portfolio";
import { Container } from "../Shared/Container";
import SectionHeading from "../Shared/SectionHeading";
import {
  Section,
  Layout,
  Item,
  Select,
  Links,
  Paper,
  Toolbar,
  Demo,
  Cover,
  Pending,
  List,
  ListNavigation,
  PageSurface,
  ReaderDialog,
  ZoomControls,
  PageSheet,
  PageColors,
} from "./Screenplays.styles";
const PdfPreview = lazy(() => import("../PdfPreview/PdfPreview"));
export default function Screenplays() {
  const surface = useRef<HTMLDivElement>(null);
  const expandButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [bolder, setBolder] = useState(() => {
    try {
      return localStorage.getItem("screenplay-bolder-text") === "true";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("screenplay-bolder-text", String(bolder));
    } catch {
      // The control still works when browser storage is unavailable.
    }
  }, [bolder]);
  const [pageTone, setPageTone] = useState<"white" | "warm">(() => {
    try {
      return localStorage.getItem("screenplay-page-tone") === "warm" ? "warm" : "white";
    } catch {
      return "white";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("screenplay-page-tone", pageTone);
    } catch {
      // Reading preferences remain usable when browser storage is unavailable.
    }
  }, [pageTone]);
  const [pageWidth, setPageWidth] = useState(420);
  useEffect(() => {
    if (!expanded || !surface.current) return;
    const element = surface.current;
    const measure = () => {
      const availableHeight = element.clientHeight - 2;
      setPageWidth(Math.min(element.clientWidth - 2, availableHeight / Math.SQRT2));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, [expanded]);
  const closeReader = () => {
    setExpanded(false);
    setZoom(1);
    requestAnimationFrame(() => expandButton.current?.focus({ preventScroll: true }));
  };
  useEffect(() => {
    if (!expanded) return;
    const element = dialog.current;
    if (!element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
  return () => {
      element.close();
      document.body.style.overflow = previousOverflow;

    };
  }, [expanded]);
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(screenplays[0].cover ? 0 : 1);
  useEffect(() => {
    if (surface.current) surface.current.scrollTop = 0;
  }, [page, expanded]);
  const current = screenplays[active];
  const choose = (i: number) => {
    setActive(i);
    setPage(screenplays[i].cover ? 0 : 1);
    setMaxPages(screenplays[i].pageCount ?? 10);
  };
  const [maxPages, setMaxPages] = useState(screenplays[0].pageCount ?? 10);
  const onPdfLoad = useCallback((count: number) => {
    setMaxPages(count);
    setPage((p) => Math.min(p, count));
  }, []);
  const group = Math.floor(active / 4);
  const groupCount = Math.ceil(screenplays.length / 4);
  const pageContent = (
    <>
            {page === 0 && current.cover ? (
              <>
                <Cover
                  src={current.cover}
                  alt={`${current.title} screenplay cover`}
                />
              </>
            ) : current.previewPdf ? (
              <Suspense fallback={<p role="status">Loading preview...</p>}>
                <PdfPreview
                  key={current.id}
                  url={current.previewPdf}
                  page={page}
                  onLoad={onPdfLoad}
                  bolder={bolder}
                  warm={pageTone === "warm" && page > 0}
                />
              </Suspense>
            ) : null}
    </>
  );
  const reader = (
    <>
            <Toolbar>

              <span id={expanded ? "reader-title" : undefined}>{current.title}</span>
              <div>
                <small aria-live="polite">
                  {page === 0 ? "Cover" : `${page} / ${maxPages}`}
                </small>
                <button
                  disabled={page === (current.cover ? 0 : 1)}
                  aria-label="Previous page"
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={!current.previewPdf || page >= maxPages}
                  aria-label="Next page"
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  ref={expanded ? undefined : expandButton}
                  type="button"
                  aria-label={expanded ? "Close screenplay reader" : "Expand screenplay"}
                  onClick={() => expanded ? closeReader() : setExpanded(true)}
                >
                  {expanded ? <X size={17} /> : <Maximize2 size={17} />}
                </button>
              </div>
            </Toolbar>
            {expanded && (
              <ZoomControls aria-label="Page zoom">
                <button type="button" aria-label="Zoom out" disabled={zoom <= 1}
                  onClick={() => setZoom(value => Math.max(1, value - 0.25))}>
                  <Minus size={17} />
                </button>
                <span aria-live="polite">{Math.round(zoom * 100)}%</span>
                <button type="button" aria-label="Zoom in" disabled={zoom >= 3}
                  onClick={() => setZoom(value => Math.min(3, value + 0.25))}>
                  <Plus size={17} />
                </button>
                <button type="button" aria-label="Fit whole page"
                  onClick={() => setZoom(1)}>
                  <RotateCcw size={16} />
                  Fit page
                </button>
                <PageColors role="group" aria-label="Page background">
                  <button type="button" aria-label="White page" title="White"
                    aria-pressed={pageTone === "white"} onClick={() => setPageTone("white")}>
                    <span data-tone="white" aria-hidden="true" /> White
                  </button>
                  <button type="button" aria-label="Warm page" title="Warm"
                    aria-pressed={pageTone === "warm"} onClick={() => setPageTone("warm")}>
                    <span data-tone="warm" aria-hidden="true" /> Warm
                  </button>
                </PageColors>
                <PageColors role="group" aria-label="Text weight">
                  <button type="button" aria-label="Classic text"
                    aria-pressed={!bolder} onClick={() => setBolder(false)}>
                    Classic
                  </button>
                  <button type="button" aria-label="Bolder text"
                    aria-pressed={bolder} onClick={() => setBolder(true)}>
                    <strong>Bolder</strong>
                  </button>
                </PageColors>
              </ZoomControls>
            )}
            <PageSurface ref={surface} $expanded={expanded}>
              {expanded ? (
                <PageSheet $width={pageWidth * zoom} $warm={pageTone === "warm" && page > 0}>{pageContent}</PageSheet>
              ) : pageContent}
            </PageSurface>
            {!current.previewPdf && (
              <Pending>The first 10 pages will be available here soon.</Pending>
            )}
            {current.demo !== false && (
              <Demo>Sample screenplay - demonstration content</Demo>
            )}
    </>
  );
  return (
    <Section id="screenplays">
      <Container>
        <SectionHeading
          title="Screenplays"
          description="Original stories for film and television."
        />
        <Layout>
          <List>
          <div
            role="tablist"
            aria-label="Choose screenplay"
            aria-orientation="vertical"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const i =
                  (active +
                    (e.key === "ArrowDown" ? 1 : -1) +
                    screenplays.length) %
                  screenplays.length;
                choose(i);
                requestAnimationFrame(() => document.getElementById("tab-" + screenplays[i].id)?.focus());
              }
            }}
          >
            {screenplays.slice(group * 4, group * 4 + 4).map((s, offset) => {
              const i = group * 4 + offset;
              return (
              <Item
                key={s.id}
                $active={i === active}
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("a, button")) return;
                  choose(i);
                }}
              >
                <Select
                  id={"tab-" + s.id}
                  role="tab"
                  aria-selected={active === i}
                  aria-controls="screenplay-panel"
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => choose(i)}
                >
                  <h3>{s.title}</h3>
                  <small>{s.genre}</small>
                </Select>
                <p>{s.description}</p>
                {s.previewPdf ? (
                  <Links>
                    <a
                      href={s.previewPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText size={19} />
                      {s.fullTeaser ? "Read pilot teaser" : "Preview 10 pages"}
                    </a>
                    <a href={s.previewPdf} download>
                      <Download size={19} />
                      {s.fullTeaser ? "Teaser PDF" : "Demo PDF"}
                    </a>
                  </Links>
                ) : (
                  <Links>
                    <span>10-page preview coming soon</span>
                  </Links>
                )}
              </Item>
            );})}
          </div>
          {groupCount > 1 && (
            <ListNavigation aria-label="Screenplay groups">
              <button type="button" aria-label="Previous screenplay group"
                disabled={group === 0} onClick={() => choose((group - 1) * 4)}>
                <ChevronLeft size={18} />
              </button>
              <span>{group + 1} / {groupCount}</span>
              <button type="button" aria-label="Next screenplay group"
                disabled={group === groupCount - 1} onClick={() => choose((group + 1) * 4)}>
                <ChevronRight size={18} />
              </button>
            </ListNavigation>
          )}
          </List>
          <Paper
            id="screenplay-panel"
            role="tabpanel"
            aria-labelledby={"tab-" + current.id}
          >
            {!expanded && reader}
          </Paper>
        </Layout>
      </Container>
      {expanded && (
        <ReaderDialog
          ref={dialog}
          aria-labelledby="reader-title"
          onCancel={closeReader}
          onClose={closeReader}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              const rect = event.currentTarget.getBoundingClientRect();
              if (event.clientX < rect.left || event.clientX > rect.right ||
                  event.clientY < rect.top || event.clientY > rect.bottom) {
                closeReader();
              }
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" && page > (current.cover ? 0 : 1)) {
              event.preventDefault();
              setPage(page - 1);
            }
            if (event.key === "ArrowRight" && current.previewPdf && page < maxPages) {
              event.preventDefault();
              setPage(page + 1);
            }
          }}
        >
          {reader}
        </ReaderDialog>
      )}
    </Section>
  );
}
