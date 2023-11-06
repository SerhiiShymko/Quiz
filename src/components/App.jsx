import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
import { Layout } from './Layout';
import { Component } from 'react';
import { QuizForm } from './QuizForm/QuizForm';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: '',
      level: 'all',
    },
  };

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('this.props:', this.state);
    console.log('prevState:', prevState);
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
          topicFilter={filters.topic}
          levelFilter={filters.level}
          onChandeTopic={this.changeTopicFilter}
          onChandeLevel={this.changeLevelFilter}
        />
        <QuizForm onAdd={this.addQuiz} />
        <QuizList items={visibleQuizItems} onDelete={this.handleDelete} />
      </Layout>
    )
  }
}
