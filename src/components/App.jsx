import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
// import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
// import { HiAcademicCap, HiAdjustments, HiArchive } from 'react-icons/hi';
// import { IconButton } from './IconButton/IconButton';
import { Component } from 'react';
import { QuizForm } from './QuizForm/QuizForm';

// export const App = () => {
//   return (
//     <Layout>
//       <SearchBar />
//       <QuizList items={quizItems} />

//       <IconButton variant="primary" size="sm">
//         <HiAcademicCap />
//       </IconButton>
//       <IconButton variant="secondary" size="md">
//         <HiArchive />
//       </IconButton>
//       <IconButton variant="secondary" size="lg">
//         <HiAdjustments />
//       </IconButton>

//       <GlobalStyle />
//     </Layout>
//   );
// };

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

  render() {
    return (
      <Layout>
        <SearchBar />
        <QuizForm />
        <QuizList items={this.state.quizItems} onDelete={this.handleDelete} />
      </Layout>
    )
  }
}
