import ReviewCard from "./ReviewCard";

export default function ReviewSection({ reviews }) {
    return (
        <section id="reviews" className="py-20 scroll-mt-36">
            <style>
                {`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-100% - 1.5rem));
                    }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
                `}
            </style>

            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold">
                    Client Reviews
                </h2>
            </div>

            {/* Marquee Container */}
            <div
                className="group relative flex overflow-hidden"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
            >
                {/* Original Set */}
                <div className="flex shrink-0 gap-6 animate-marquee mr-6">
                    {reviews.map((review) => (
                        <div key={`orig-${review.id}`} className="w-[85vw] sm:w-[350px] md:w-[450px] shrink-0">
                            <ReviewCard
                                name={review.name}
                                role={review.role}
                                image={review.img}
                                review={review.text}
                                bgColor={review.bgColor}
                            />
                        </div>
                    ))}
                </div>

                {/* Duplicated Set for infinite loop */}
                <div className="flex shrink-0 gap-6 animate-marquee mr-6" aria-hidden="true">
                    {reviews.map((review) => (
                        <div key={`dup-${review.id}`} className="w-[85vw] sm:w-[350px] md:w-[450px] shrink-0">
                            <ReviewCard
                                name={review.name}
                                role={review.role}
                                image={review.img}
                                review={review.text}
                                bgColor={review.bgColor}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}