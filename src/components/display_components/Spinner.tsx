import * as React from 'react';

export default function Spinner (props: SpinnerProps) {
    return (
        <div className={props.isStart ? "table" : "hidden"}>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )   
} 

interface SpinnerProps {
    isStart: boolean;
} 