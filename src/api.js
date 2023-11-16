import axios from 'axios';

axios.defaults.baseURL = 'https://648860930e2469c038fd986c.mockapi.io/api/v1';

export const fetchQuizzes = async () => {
  const response = await axios.get('/quizzes');
  return response.data;
};

export const deleteQuiz = async quizId => {
  const response = await axios.delete(`/quizzes/${quizId}`);
  return response.data;
};
