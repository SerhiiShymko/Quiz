import { C } from './C';

const styles = {
    backgroundColor: 'yellow',
    padding: 12,
};

export const B = ({ value, onReset1, onIncrement }) => {
    return (
        <div style={styles}>
            <p>Clicks: {value}</p>
            <button onClick={onIncrement}>GO</button>
            <button onClick={onReset1}>Reset</button>
            <C cont={value} onPlus2={onIncrement} onReset2={onReset1} />
        </div>
    );
};