import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuiz } from '../../../../services/apiService'
const DetailQuiz = (props) => {

    const param = useParams();
    const quizId = param.id;

    useEffect(() => {
        fetchQuestions()
    }, [quizId])

    const fetchQuestions = async () => {
        let data = await getDataQuiz(quizId)
        console.log(data);
    }
    return (
        <div>
            the quiz detail
        </div>
    )
}

export default DetailQuiz