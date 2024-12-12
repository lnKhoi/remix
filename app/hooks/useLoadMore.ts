import { useRef } from "react";

interface UseLoadMoreProps {
    onLoadMore: () => void;
}

export const useLoadMore = ({ onLoadMore }: UseLoadMoreProps) => {
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