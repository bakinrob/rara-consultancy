import { ArrowRight } from "lucide-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;

  return (
    <li
      className="slide"
      style={{
        transform: `translateX(${(index - current) * 100}%)`,
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        position: index === 0 ? "relative" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      <div
        ref={slideRef}
        className="slide-inner"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div className="slide-bg">
          <img
            alt={title}
            src={src}
            className="slide-image"
            onLoad={imageLoaded}
            loading="lazy"
          />
          {current === index && <div className="slide-overlay" />}
        </div>

        <div className="slide-info">
          <div className="slide-title">
            <span>{title}</span>
          </div>
          <div className="slide-button-wrapper">
            <button className="slide-button">
              {button}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => {
  return (
    <button
      className={`carousel-control carousel-control--${type}`}
      title={title}
      onClick={handleClick}
    >
      <ArrowRight className="h-5 w-5" />
    </button>
  );
};

interface FancyCarouselProps {
  slides: SlideData[];
}

export function FancyCarousel({ slides }: FancyCarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index);
  };

  const id = useId();

  return (
    <div className="fancy-carousel" aria-labelledby={`carousel-heading-${id}`}>
      <ul className="fancy-carousel__slides" style={{ perspective: "1200px" }}>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="fancy-carousel__controls">
        <CarouselControl type="previous" title="Previous" handleClick={handlePreviousClick} />
        <CarouselControl type="next" title="Next" handleClick={handleNextClick} />
      </div>
    </div>
  );
}
