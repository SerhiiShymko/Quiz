const styles = {
    backgroundColor: 'white',
    padding: 20,
};

export const C = ({ cont, onReset2, onPlus2 }) => {
    return (
        <div style={styles}>
            <p>Clicks: {cont}</p>
            <button onClick={onPlus2}>Plus</button>
            <button onClick={onReset2}>Reset</button>
        </div>
    )
}