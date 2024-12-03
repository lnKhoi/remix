import React from 'react';

type TagColorProps = {
    color: string,
    background: string
    status: string
}

export default function TagColor({ background, color, status }: TagColorProps) {
    return (
        <div style={{ backgroundColor: background }}
            className={`inline-flex items-center px-4 gap-1 rounded-[50px] h-[28px]`}>
            <div style={{ backgroundColor: color }}
                className={`w-2 h-2 rounded-[50%]`}></div>
            <span style={{ color: color }} className='text-[12px] capitalize '>{status}</span>
        </div>
    )
}
