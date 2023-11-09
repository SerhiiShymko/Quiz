import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
import { Layout } from './Layout';
import { Component } from 'react';
import { QuizForm } from './QuizForm/QuizForm';
import { LevelFilter } from './LevelFilter';
import { TopicFilter } from './TopicFilter';

const localStorageKey = 'quiz-filters'
const initialFilters = {
  topic: '',
  level: 'all',
}

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: initialFilters,
  };

  componentDidMount() {
    const savedFilters = localStorage.getItem(localStorageKey)
    if (savedFilters !== null) {
      this.setState({
        filters: JSON.parse(savedFilters)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { filters: prevFilters } = prevState;
    const { filters: nextFilters } = this.state;


    if (prevFilters !== nextFilters) {
      localStorage.setItem(localStorageKey, JSON.stringify(nextFilters))
    }
  }

  // componentWillUnmount() { }

  resetFilters = () => {
    this.setState({
      filters: initialFilters,
    })
  }

  changeTopicFilter = newTopic => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          topic: newTopic,
        },
      };
    });
  };

  changeLevelFilter = newLevel => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          level: newLevel
        }
      }
    })
  }

  handleDelete = (quizId) => {
    this.setState(prevState => {
      return {
        quizItems: prevState.quizItems.filter(quiz => quiz.id !== quizId)
      }
    })
  }

  addQuiz = newQuiz => {
    this.setState(prevState => {
      return {
        quizItems: [...prevState.quizItems, newQuiz]
      }
    })
  }

  getVisibleQuizItems = () => {
    const { quizItems, filters } = this.state
    const lowerCaseTopic = filters.topic.toLowerCase()

    return quizItems.filter(quiz => {
      const hasTopis = quiz.topic.toLowerCase().includes(lowerCaseTopic)

      if (filters.level === 'all') {
        return (
          hasTopis
        )
      }
      return (
        hasTopis && quiz.level === filters.level
      )
    })
  }

  render() {
    console.log('render');
    const { filters } = this.state

    const visibleQuizItems = this.getVisibleQuizItems()

    return (
      <Layout>
        <SearchBar
          onReset={this.resetFilters}
        >
          <TopicFilter value={filters.topic} onChange={this.changeTopicFilter} />
          <LevelFilter value={filters.level} onChange={this.changeLevelFilter} />
        </SearchBar>
        <QuizForm onAdd={this.addQuiz} />
        <QuizList items={visibleQuizItems} onDelete={this.handleDelete} />
      </Layout>
    )
  }
}
