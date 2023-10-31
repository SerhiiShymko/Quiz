import { LevelFilter } from '../LevelFilter';
import { TopicFilter } from '../TopicFilter';
import { Wrapper } from './SearchBar.styled';

export const SearchBar = ({ topicFilter, onChandeTopic }) => {
    return (
        <Wrapper>
            <TopicFilter value={topicFilter} onChange={onChandeTopic} />
            <LevelFilter />
        </Wrapper>
    );
};