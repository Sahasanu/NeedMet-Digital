
import TimelineItem from "./TimelineItem";

export default function Timeline({ timeline }) {
    return (
        <section className="py-10 sm:py-12 lg:py-16">
            <div className="rounded-2xl bg-primary-surface p-5 sm:rounded-3xl sm:p-8 lg:rounded-[32px] lg:p-10">

                <h2 className="mb-8 text-2xl font-bold sm:mb-10 sm:text-3xl lg:text-4xl">
                    Deliverables Timeline
                </h2>

                <div className="space-y-1">
                    {timeline.map((item, index) => (
                        <TimelineItem
                            key={index}
                            title={item.week}
                            description={item.desc}
                            isLast={index === timeline.length - 1}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}