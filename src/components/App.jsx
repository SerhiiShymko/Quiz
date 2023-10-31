import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
// import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
// import { HiAcademicCap, HiAdjustments, HiArchive } from 'react-icons/hi';
// import { IconButton } from './IconButton/IconButton';
import { Component } from 'react';
import { QuizForm } from './QuizForm/QuizForm';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: '',
      level: ''
    }

  }

  chandeTopicFilter = (newTopic) => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          topic: newTopic
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

  render() {
    const { filters, quizItems } = this.state

    const visibleQuizItems = quizItems.filter(quiz =>
      quiz.topic.toLowerCase().includes(filters.topic.toLowerCase()))

    return (
      <Layout>
        <SearchBar
          topicFilter={filters.topic}
          onChandeTopic={this.chandeTopicFilter} />
        <QuizForm onAdd={this.addQuiz} />
        <QuizList items={visibleQuizItems} onDelete={this.handleDelete} />
      </Layout>
    )
  }
}
