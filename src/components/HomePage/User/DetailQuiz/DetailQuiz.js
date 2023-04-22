import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../../../services/apiService'
import _ from "lodash"
import "./DetailQuiz.scss"
import Question from './Question';

const DetailQuiz = (props) => {

    const param = useParams();
    const location = useLocation();
    const quizId = param.id;

    const [questionData, setQuestionData] = useState([])
    const [index, setIndex] = useState(0)

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
            setQuestionData(customizedData)
        }
    }

    const handlePrev = () => {
        if (index > 0) setIndex(index - 1)
    }

    const handleNext = () => {
        if (index < questionData.length - 1) setIndex(index + 1)
    }

    console.log(questionData, index);
    return (
        <div className='detail-quiz-container'>
            <div className='left-content'>
                <div className='q-title'>
                    <h1>Quiz {quizId}: {location?.state?.quizDescription}</h1>
                </div>
                <hr />
                <div className='q-body'>
                    <Question
                        index={index}
                        questionData={questionData && questionData.length > 0 ? questionData[index] : []} />

                </div>
                <div className='q-footer'>
                    <button
                        className='btn btn-secondary'
                        onClick={() => handlePrev()}
                    >Prev</button>
                    <button
                        className='btn btn-primary'
                        onClick={() => handleNext()}
                    >Next</button>
                </div>
            </div>
            <div className='right-content'>
                time countdown
            </div>
        </div>
    )
}

export default DetailQuiz