import * as React from 'react';

type SpinnerProps = {
    isStart: boolean;
}

export default class Spinner extends React.Component<SpinnerProps> {
    render() {
        return (
            <div className={this.props.isStart ? "col-lg-4" : "hidden"}>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
           </div>
        )
    }
} 