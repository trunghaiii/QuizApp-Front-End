import { useState, useEffect } from 'react';
import { getQuizByParticipant } from '../../../../services/apiService'
import "./QuizList.scss"

const QuizList = (props) => {
    const [quizList, setQuizList] = useState([])

    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        let data = await getQuizByParticipant();

        if (data && data.EC === 0) {
            console.log(data.DT);
            setQuizList(data.DT);
        }
    }
    return (
        <div className="user-quiz-container container">
            {quizList && quizList.length > 0 &&
                quizList.map((quiz, index) => {
                    return (
                        <div className="card" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`data:image/jpeg;base64,${quiz.image}`} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <a href="#" className="btn btn-primary">Start Now</a>
                            </div>
                        </div>
                    )
                })

            }
            {quizList && quizList.length === 0 &&

                <div>
                    You dont have any Quiz now...
                </div>

            }
        </div>
    )
}


export default QuizList