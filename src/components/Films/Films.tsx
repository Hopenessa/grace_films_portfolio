import { Fragment } from "react";
import { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { films } from "../../data/portfolio";
import { Container } from "../Shared/Container/Container";
import { ScreenReaderText } from "../Shared/ScreenReaderText/ScreenReaderText";
import SectionHeading from "../Shared/SectionHeading/SectionHeading";
import {
  Section,
  Heading,
  Track,
  Card,
  Preview,
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
      if ((e.target as HTMLElement).closest("dialog")) return;
      if (
        !el.contains(document.activeElement) &&
        (e.target as HTMLElement).closest("a, button, input, textarea, select")
      )
        return;
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
        const restoreFocus =
          document.activeElement?.closest("[data-film-card]");
        move(e.key === "ArrowRight" ? 1 : -1);
        if (restoreFocus) {
          requestAnimationFrame(() =>
            el
              .querySelector<HTMLAnchorElement>("a[data-selected-film]")
              ?.focus({ preventScroll: true }),
          );
        }
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
    <Section id="films" ref={region} role="region" aria-label="Films">
      <Container>
        <Heading>
          <SectionHeading
            title="Films"
            description="Character-driven horror and drama films."
          />
        </Heading>
        <div>
          <Track>
            {visible.map((film, i) => {
              const active = i === 0;
              const youtubeUrl = film.youtubeUrl;
              const preview = (
                <img
                  src={film.image}
                  alt={`${film.title} film preview`}
                  loading="lazy"
                />
              );
              const title = (
                <Meta>
                  <h3>{film.title}</h3>
                </Meta>
              );
              return (
                <Card key={i} $active={active} data-film-card>
                  <Fragment key={film.id}>
                    {active ? (
                      <>
                        <Preview
                          as="a"
                          href={youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-selected-film
                          aria-describedby="selected-film-description"
                          aria-label={`Watch ${film.title} on YouTube (opens in a new tab)`}
                        >
                          {preview}
                          <WatchBadge aria-hidden="true">
                            <Play
                              aria-hidden="true"
                              size={18}
                              fill="currentColor"
                              strokeWidth={0}
                            />
                            Watch on YouTube
                          </WatchBadge>
                        </Preview>
                        <FilmCopy>
                          <span>Selected film</span>
                          {title}
                          <p id="selected-film-description">
                            {film.description}
                          </p>
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
                          requestAnimationFrame(() =>
                            region.current
                              ?.querySelector<HTMLAnchorElement>(
                                "a[data-selected-film]",
                              )
                              ?.focus({ preventScroll: true }),
                          );
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
                          Film details{" "}
                          <ChevronRight aria-hidden="true" size={15} />
                        </Details>
                      </SelectCard>
                    )}
                  </Fragment>
                </Card>
              );
            })}
          </Track>
          <ScreenReaderText role="status" aria-live="polite" aria-atomic="true">
            Selected film: {films[selected].title}. Film {selected + 1} of{" "}
            {films.length}.
          </ScreenReaderText>
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
              <FilmCounter aria-hidden="true">
                {String(selected + 1).padStart(2, "0")} /{" "}
                {String(films.length).padStart(2, "0")}
              </FilmCounter>
              <button aria-label="Previous film" onClick={() => move(-1)}>
                <ChevronLeft aria-hidden="true" size={18} />
              </button>
              <button aria-label="Next film" onClick={() => move(1)}>
                <ChevronRight aria-hidden="true" size={18} />
              </button>
            </Arrows>
          </Controls>
        </div>
      </Container>
    </Section>
  );
}
