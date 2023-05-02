
import Select from 'react-select';
import "./Questions.scss"
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import _ from 'lodash'


const Questions = (props) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                desciption: 'questions 111',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 111',
                        isCorrect: false
                    }
                ]
            }
        ]
    )

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                desciption: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };

            setQuestions([...questions, newQuestion]);
        }

        if (type === "REMOVE") {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(question => question.id !== id);
            setQuestions(questionClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };

            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers =
                questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }
    }

    console.log("questionnn:  ", questions);
    return (
        <div className="manage-question-container">
            <div className="title">
                <h3>Manage Questions: </h3>
                <hr />
            </div>
            <div className="manage-question-content mt-5">
                <div className="quiz col-6 mt-3">
                    <h5>Select Quiz:</h5>
                    <Select
                        // defaultValue={selectedOption}
                        // onChange={setSelectedOption}
                        options={options}
                    />
                </div>
                <h5 className='mt-4'>Add Question:</h5>
                <div className='quiz-content mt-3'>
                    {questions && questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <>
                                    <div key={question.id} className="question">
                                        <div className="q-input col-6">
                                            <label >Question {index + 1} 's description</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder='Description'
                                                value={question.desciption}
                                            />
                                        </div>
                                        <div className='q-img-upload'>
                                            <label className='img-upload-label'>Upload Image</label>
                                            <input type='file' hidden />
                                            <span>0 files uploaded</span>

                                        </div>
                                        <span onClick={() => handleAddRemoveQuestion("ADD", question.id)}>
                                            <BsPatchPlusFill className='add-q' />
                                        </span>
                                        <span onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}>
                                            <BsPatchMinusFill className='remove-q' />
                                        </span>

                                    </div>
                                    {
                                        question.answers && question.answers.length > 0 &&
                                        question.answers.map((answer, index) => {
                                            return (
                                                <div key={answer.id} className="answer mt-3">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                    <div className="a-input col-6">
                                                        <label >Answers {index + 1} </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={answer.description}
                                                        />
                                                    </div>
                                                    <span onClick={() => handleAddRemoveAnswer("ADD", question.id, answer.id)}>
                                                        <AiFillPlusSquare className='add-a' />
                                                    </span>
                                                    <span onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}>
                                                        <AiFillMinusSquare className='remove-a' />
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </>


                            )
                        })
                    }


                </div>


            </div>

        </div>
    )
}


export default Questions