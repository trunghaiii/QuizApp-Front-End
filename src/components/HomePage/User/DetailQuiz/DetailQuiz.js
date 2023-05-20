import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../../../services/apiService'
import _ from "lodash"
import "./DetailQuiz.scss"
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './RightContent/RightContent';

const DetailQuiz = (props) => {

    const param = useParams();
    const location = useLocation();
    const quizId = param.id;
    const navigate = useNavigate()

    const [questionData, setQuestionData] = useState([])
    const [index, setIndex] = useState(0)

    const [showModalResult, setShowModalResult] = useState(false)
    const [resultData, setResultData] = useState({})

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
                        answers.push({ id: quizanswer_id, description: quizanswer_description, isSelected: false })
                    })
                    //console.log(value);
                    return { questionId: key, answers, questionDescription, image }

                })
                .value()
            setQuestionData(customizedData)
        }
    }

    const handleCheckBoxData = (questionId, answerId) => {
        const questionDataClone = _.cloneDeep(questionData);
        const question = questionDataClone.find(item => Number(item.questionId) === Number(questionId))
        if (question && question.answers) {
            const b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = b;
        }
        // console.log(question);

        let index = questionDataClone.findIndex(item => Number(item.questionId) === Number(questionId));
        if (index > -1) {
            questionDataClone[index] = question;
            setQuestionData(questionDataClone)
        }
        // console.log(questionDataClone);
        // console.log(questionData);

        //console.log(questionData);
    }



    const handlePrev = () => {
        if (index > 0) setIndex(index - 1)
    }

    const handleNext = () => {
        if (index < questionData.length - 1) setIndex(index + 1)
    }
    // {
    //     "quizId": 1,
    //     "answers": [
    //         { 
    //             "questionId": 1,
    //             "userAnswerId": [3]
    //         },
    //         { 
    //             "questionId": 2,
    //             "userAnswerId": [6]
    //         }
    //     ]
    // }

    const handleFinish = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }

        if (questionData && questionData.length > 0) {
            questionData.forEach((question) => {
                let questionId = +question.questionId
                let userAnswerIdArr = [];
                if (question.answers && question.answers.length > 0) {
                    question.answers.forEach((answer) => {
                        if (answer.isSelected === true) {
                            userAnswerIdArr.push(answer.id);
                        }
                    })
                }

                payload.answers.push({ questionId: questionId, userAnswerId: userAnswerIdArr })
            })
        }
        //console.log("final patload", payload);
        //console.log(payload);

        // submit api with payload

        let data = await postSubmitQuiz(payload);
        //console.log(res);

        if (data && data.EC === 0) {
            setResultData({
                countCorrect: data.DT.countCorrect,
                countTotal: data.DT.countTotal,
                quizData: data.DT.quizData
            })
            setShowModalResult(true)
        } else {
            alert("something went wrong")
        }


    }

    //console.log(questionData, index);
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
                        questionData={questionData && questionData.length > 0 ? questionData[index] : []}
                        handleCheckBoxData={handleCheckBoxData}
                    />

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
                    <button
                        className='btn btn-warning'
                        onClick={() => handleFinish()}
                    >Finish</button>
                </div>
                <div className='back-to-quiz-list mt-3'>
                    <button
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={() => navigate("/user")}
                    >Back to Quiz List</button>
                </div>
            </div>
            <div className='right-content'>
                <RightContent
                    questionData={questionData}
                    handleFinish={handleFinish}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult
                show={showModalResult}
                setShow={setShowModalResult}
                resultData={resultData}
            />
        </div>

    )
}

export default DetailQuiz