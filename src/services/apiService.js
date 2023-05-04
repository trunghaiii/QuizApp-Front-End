import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data);
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data);
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}

const getAllUsersPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/auth/login`, { email, password });
}

const postRegisterUser = (email, password, username) => {
    return axios.post(`api/v1/auth/register`, { email, password, username });
}

const getQuizByParticipant = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    //console.log({ ...data });
    return axios.post(`api/v1/quiz-submit`, { ...data });
}

const postAddingNewQuiz = (name, description, type, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', type);
    data.append('quizImage', image);

    return axios.post('api/v1/quiz', data);
}

const getAllQuiz = () => {
    return axios.get(`api/v1/quiz/all`);
}

const putUpdateQuiz = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.put('api/v1/quiz', data);
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}

const postCreateQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);

    return axios.post('api/v1/question', data);
}

const postCreateAnswerForQuestion = (description, correct_answer, question_id) => {

    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}
export {
    postCreateNewUser, getAllUsers,
    putUpdateUser, deleteUser, getAllUsersPaginate,
    postLogin, postRegisterUser,
    getQuizByParticipant, getDataQuiz,
    postSubmitQuiz, postAddingNewQuiz,
    getAllQuiz, putUpdateQuiz,
    deleteQuiz, postCreateQuestionForQuiz, postCreateAnswerForQuestion
}