import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import React, { useState } from "react";

const images = [
    "/img/gallery/IMG_7670.jpg",
    "/img/gallery/IMG_20190928_174759.jpg",
    "/img/gallery/jugend_teamfoto.jpg",
];

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
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

    // TODO: LOADS ALL IMAGES IN BEGINNING AND SHOWS THEM - WE DONT WANT THAT
    return (
        <>
            {!loaded && (
                <div className="max-w-[800px] h-[250px] mb-2 self-center items-center">
                    <img src={images.at(0)} alt={`Gallery image 0`} className="w-full h-full object-cover" />
                </div>
            )}
            {/*---------- currently here ------- TODO: should become else branch*/}
            <div ref={sliderRef} className="keen-slider max-w-[800px] h-[250px] mb-2 self-center items-center">
                {images.map((src, idx) => (
                    <div className="keen-slider__slide" key={idx}>
                        <img src={src} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover" />
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
        </>
    )
}
