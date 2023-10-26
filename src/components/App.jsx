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
    quizItems: initialQuizItems
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
    return (
      <Layout>
        <SearchBar />
        <QuizForm onAdd={this.addQuiz} />
        <QuizList items={this.state.quizItems} onDelete={this.handleDelete} />
      </Layout>
    )
  }
}
