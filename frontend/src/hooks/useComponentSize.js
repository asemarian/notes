import { useState, useEffect, useRef } from 'react';

export default function useComponentSize() {
    const ref = useRef();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);

        const listener = () => {
            setWidth(ref.current.clientWidth);
            setHeight(ref.current.clientHeight);
        }

        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        }
    });

    return { ref, width, height };
}