import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../../../services/apiService'
import _ from "lodash"
import "./DetailQuiz.scss"
const DetailQuiz = (props) => {

    const param = useParams();
    const location = useLocation();
    const quizId = param.id;

    useEffect(() => {
        fetchQuestions()
    }, [quizId])

    const fetchQuestions = async () => {
        let data = await getDataQuiz(quizId)
        if (data && data.EC === 0) {
            let rawData = data.DT
            //console.log(rawData);
            let customizedData = _.chain(rawData)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription
                    let image

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        let quizanswer_description = item.quizanswer_description
                        let quizanswer_id = item.quizanswer_id
                        answers.push({ id: quizanswer_id, description: quizanswer_description })
                    })
                    //console.log(value);
                    return { questionId: key, answers, questionDescription, image }

                })
                .value()
            console.log(customizedData);
        }
    }
    return (
        <div className='detail-quiz-container'>
            <div className='left-content'>
                <div className='q-title'>
                    <h1>Quiz {quizId}: {location?.state?.quizDescription}</h1>
                </div>
                <hr />
                <div className='q-body'>
                    <div className='image'></div>
                    <div className='question'>Question 1: How are you?</div>
                    <div className='answer'>
                        <div className='a-child'>A, option A</div>
                        <div className='a-child'>B, option B</div>
                        <div className='a-child'>C, option C</div>
                    </div>

                </div>
                <div className='q-footer'>
                    <button className='btn btn-secondary'>Prev</button>
                    <button className='btn btn-primary'>Next</button>
                </div>
            </div>
            <div className='right-content'>
                time countdown
            </div>
        </div>
    )
}

export default DetailQuiz