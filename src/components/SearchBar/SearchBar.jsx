import { LevelFilter } from '../LevelFilter';
import { TopicFilter } from '../TopicFilter';
import { Wrapper } from './SearchBar.styled';

export const SearchBar = ({
    topicFilter,
    levelFilter,
    onChandeTopic,
    onChandeLevel,
    onReset
}) => {
    return (
        <Wrapper>
            <TopicFilter value={topicFilter} onChange={onChandeTopic} />
            <LevelFilter value={levelFilter} onChange={onChandeLevel} />
            <button onClick={onReset}>Reset filters</button>
        </Wrapper>
    );
};