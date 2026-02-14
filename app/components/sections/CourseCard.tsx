"use client";

import SpotlightCard from "../ui/SpotlightCard";
import { useSpring, animated } from "@react-spring/web";

export default function CourseCard({
    course,
    index,
    isVisible,
}: {
    course: { title: string; description: string };
    index: number;
    isVisible: boolean;
}) {
    const styles = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        delay: 200 + index * 100,
        config: { tension: 280, friction: 60 },
    });

    return (
        <animated.div style={styles}>
            <SpotlightCard className="group transition-all duration-300 hover:shadow-xl">
                <div className="relative z-10 text-center p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-primary">
                        {course.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                        {course.description}
                    </p>
                </div>
            </SpotlightCard>
        </animated.div>
    );
}
