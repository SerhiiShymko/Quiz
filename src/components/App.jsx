import { QuizList } from './QuizList/QuizList';
import { SearchBar } from './SearchBar/SearchBar';
import { Layout } from './Layout';
import { QuizForm } from './QuizForm/QuizForm';
import { LevelFilter } from './LevelFilter';
import { TopicFilter } from './TopicFilter';
import { createQuiz, deleteQuiz, fetchQuizzes } from 'api';
import { useEffect, useState } from 'react';

const localStorageKey = 'quiz-filters';
const initialFilters = {
  topic: '',
  level: 'all',
};

const getInitialFilters = () => {
  const savedFilters = localStorage.getItem(localStorageKey);
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }
  return initialFilters
}

export const App = () => {
  const [quizItems, setQuizItems] = useState([])
  const [filters, setFilters] = useState(getInitialFilters)
  const [loading, setLoading] = useState(false)

  //Фетч данних х бекенду
  useEffect(() => {
    async function getQuizzes() {
      try {
        setLoading(true)
        const quizItems = await fetchQuizzes();
        setQuizItems(quizItems);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getQuizzes()
  }, [])

  //Запис фільтрів в localStorage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(filters));
  }, [filters])

  const resetFilters = () => {
    setFilters(initialFilters)
  };

  const changeTopicFilter = newTopic => {
    setFilters(prevState => ({
      ...prevState.filters,
      topic: newTopic,
    }))
  };

  const changeLevelFilter = newLevel => {
    setFilters(prevState => ({
      ...prevState.filters,
      level: newLevel,
    }))
  };

  const addQuiz = async newQuiz => {
    try {
      const createdQuiz = await createQuiz(newQuiz)
      setQuizItems(prevState => [...prevState, createdQuiz])
      // це те саме, неявний синтаксис неявного повернення
      // setQuizItems(prevState => {
      //   return [...prevState, createdQuiz]
      // })
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuiz = async (quizId) => {
    try {
      const deletedQuiz = await deleteQuiz(quizId)
      setQuizItems(prevState =>
        prevState.quizItems.filter(quiz => quiz.id !== deletedQuiz.id))
    } catch (error) {
      console.log(error);
    }

  };

  const getVisibleQuizItems = () => {
    const lowerCaseTopic = filters.topic;

    return quizItems.filter(quiz => {
      const hasTopic = quiz.topic.toLowerCase().includes(lowerCaseTopic);
      const hasMatchingLevel = quiz.level === filters.level;
      return filters.level === 'all' ? hasTopic : hasTopic && hasMatchingLevel;
    });
  };

  const visibleQuizItems = getVisibleQuizItems();

  return (
    <Layout>
      <SearchBar onReset={resetFilters}>
        <TopicFilter
          value={filters.topic}
          onChange={changeTopicFilter}
        />
        <LevelFilter
          value={filters.level}
          onChange={changeLevelFilter}
        />
      </SearchBar>
      <QuizForm onAdd={addQuiz} />
      {loading ? (
        <div>LOADING...</div>
      ) : (
        <QuizList items={visibleQuizItems} onDelete={deleteQuiz} />
      )}
    </Layout>
  );
}
