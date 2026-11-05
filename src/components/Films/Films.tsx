import { Fragment } from "react";
import { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { films } from "../../data/portfolio";
import { Container } from "../Shared/Container";
import SectionHeading from "../Shared/SectionHeading";
import {
  Section,
  Heading,
  Note,
  Track,
  Card,
  Preview,
  PreviewPlaceholder,
  SelectCard,
  Details,
  WatchBadge,
  Meta,
  Controls,
  FilmCopy,
  FilmCounter,
  Dots,
  Arrows,
} from "./Films.styles";
export default function Films() {
  const [selected, setSelected] = useState(0);
  const region = useRef<HTMLElement>(null);
  const move = (n: number) =>
    setSelected((s) => (s + n + films.length) % films.length);
  useEffect(() => {
    const el = region.current;
    if (!el) return;
    const keyboard = (e: KeyboardEvent) => {
      if (
        (!el.matches(":hover") && !el.contains(document.activeElement)) ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey
      )
        return;
      if (
        (e.target as HTMLElement).closest(
          'input, textarea, select, [contenteditable="true"]',
        )
      )
        return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        move(e.key === "ArrowRight" ? 1 : -1);
      }
    };
    window.addEventListener("keydown", keyboard);
    return () => {
      window.removeEventListener("keydown", keyboard);
    };
  }, []);
  const visible = [0, 1, 2]
    .slice(0, films.length)
    .map((n) => films[(selected + n) % films.length]);
  return (
    <Section
      id="films"
      ref={region}
      tabIndex={0}
      role="region"
      aria-label="Films. Use left and right arrow keys to select a film."
    >
      <Container>
        <Heading>
          <SectionHeading
            title="Films"
            description="Cinematic stories about real people in a changing world."
          />
          <Note>
            Selected stories · {String(selected + 1).padStart(2, "0")} /{" "}
            {String(films.length).padStart(2, "0")}
          </Note>
        </Heading>
        <div>
          <Track>
            {visible.map((film, i) => {
              const active = i === 0;
              const youtubeUrl =
                film.youtubeUrl ??
                `https://www.youtube.com/results?search_query=${encodeURIComponent(film.title + " short film")}`;
              const preview = film.image ? (
                <img
                  src={film.image}
                  alt={`${film.title} film preview`}
                  loading="lazy"
                />
              ) : (
                <PreviewPlaceholder
                  role="img"
                  aria-label={`${film.title}: preview coming soon`}
                >
                  <strong>{film.title}</strong>
                  <small>Preview coming soon</small>
                </PreviewPlaceholder>
              );
              const title = (
                <Meta>
                  <h3>{film.title}</h3>
                  {film.year && <time>{film.year}</time>}
                </Meta>
              );
              return (
                <Card key={i} $active={active}>
                  <Fragment key={film.id}>
                    {active ? (
                      <>
                        <Preview
                          as="a"
                          href={youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Watch ${film.title} on YouTube`}
                        >
                          {preview}
                          <WatchBadge aria-hidden="true">
                            <Play size={18} fill="currentColor" strokeWidth={0} />
                            Watch on YouTube
                          </WatchBadge>
                        </Preview>
                        <FilmCopy>
                          <span>Selected film</span>
                          {title}
                          <p>{film.description}</p>
                        </FilmCopy>
                      </>
                    ) : (
                      <SelectCard
                        type="button"
                        aria-label={`More about ${film.title}`}
                        onClick={() => {
                          setSelected(
                            films.findIndex((item) => item.id === film.id),
                          );
                          region.current?.focus({ preventScroll: true });
                          requestAnimationFrame(() =>
                            region.current?.scrollIntoView({
                              block: "start",
                              behavior: "instant",
                            }),
                          );
                        }}
                      >
                        <Preview>{preview}</Preview>
                        {title}
                        <Details>
                          Film details <ChevronRight size={15} />
                        </Details>
                      </SelectCard>
                    )}
                  </Fragment>
                </Card>
              );
            })}
          </Track>
          <Controls>
            <Dots>
              {films.map((f, i) => (
                <button
                  key={f.id}
                  aria-label={`Select ${f.title}`}
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                />
              ))}
            </Dots>
            <Arrows>
              <FilmCounter aria-live="polite">
                {String(selected + 1).padStart(2, "0")} / {String(films.length).padStart(2, "0")}
              </FilmCounter>
              <button aria-label="Previous film" onClick={() => move(-1)}>
                <ChevronLeft size={18} />
              </button>
              <button aria-label="Next film" onClick={() => move(1)}>
                <ChevronRight size={18} />
              </button>
            </Arrows>
          </Controls>
        </div>
      </Container>
    </Section>
  );
}
