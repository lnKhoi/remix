import { useRef } from "react";

type useScrollLoadMoreProps = {
    onLoadMore: () => void;
}

export const useScrollLoadMore = ({ onLoadMore }: useScrollLoadMoreProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (): void => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const nearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
        if (nearBottom) {
            onLoadMore();
        }
    };

    return { containerRef, handleScroll };
};