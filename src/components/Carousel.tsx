import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useState } from "react";

type imageLocationProps = {
    folder: 'gallery' | 'juniors';
};

export default function Carousel({folder}: imageLocationProps) {
    const galleryImports = import.meta.glob(
        '/src/img/gallery/*.{jpg,jpeg,png}', {
            eager: true,
            import: 'default',
            query: '?url'
        }
    );
    const juniorImports = import.meta.glob(
        '/src/img/juniors/*.{jpg,jpeg,png}', {
            eager: true,
            import: 'default',
            query: '?url'
        }
    );

    const images = Object.values(
        folder === 'gallery' ? galleryImports : juniorImports
    ) as string[];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            slides: {perView: 1},
            renderMode: "performance",
            drag: false,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>
                let mouseOver = false

                function clearNextTimeout() {
                    clearTimeout(timeout)
                }

                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 5000)
                }

                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )

    return (
        <>
            <div className="w-full max-w-[800px] h-[350px] mb-2 self-center">
                {!loaded && images.length > 0 && (
                    <img
                        src={images[0]}
                        alt="Carousel placeholder"
                        className="w-full h-full object-cover"
                        width={800}
                        height={350}
                        loading="lazy"
                        draggable={false}
                    />
                )}

                <div
                    ref={sliderRef}
                    className={`keen-slider w-full h-full ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    // style={{ transition: 'opacity 0.5s ease' }}
                >
                    {images.map((src, idx) => (
                        <div className="keen-slider__slide" key={idx}>
                            <img
                                src={src}
                                alt={`Slide ${idx + 1}`}
                                className="w-full h-full object-cover"
                                width={800}
                                height={350}
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>

                {loaded && instanceRef.current && (
                    <div className="flex justify-center gap-3 mt-3">
                        {Array.from({ length: instanceRef.current.track.details.slides.length }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                                className={`w-3 h-3 rounded-full ${currentSlide === idx ? 'scale-150 bg-black hover:cursor-pointer' : 'bg-gray-500 hover:cursor-pointer hover:scale-125'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
