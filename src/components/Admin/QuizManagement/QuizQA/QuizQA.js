
import Select from 'react-select';
import "./QuizQA.scss"
import { BsPatchPlusFill, BsPatchMinusFill, BsImages } from "react-icons/bs";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import _ from 'lodash'
import { toast } from "react-toastify"
import {
    getAllQuiz, postCreateQuestionForQuiz,
    postCreateAnswerForQuestion, getQuizQA,
    postUpsertQA
} from "../../../../services/apiService"
import Lightbox from "react-awesome-lightbox";


const QuizQA = (props) => {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]

    const [listQuiz, setListQuiz] = useState([])
    const [questions, setQuestions] = useState(initQuestions)
    const [selectedOption, setSelectedOption] = useState(null);
    const [isPreview, setIsPreview] = useState(false)
    const [previewImageUrl, SetPreviewImageUrl] = useState("")

    useEffect(() => {
        fetchAllQuiz()
    }, [])

    useEffect(() => {
        fetchQuizQA();
    }, [selectedOption])

    const fetchAllQuiz = async () => {
        let data = await getAllQuiz();

        const newData = data.DT.map(quiz => {
            return {
                value: quiz.id,
                label: `${quiz.id}-${quiz.name}`
            }
        })
        if (data && data.EC === 0) {
            setListQuiz(newData)
        }
    }

    function urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }
    const fetchQuizQA = async () => {
        let response = await getQuizQA(selectedOption.value);
        let newQA = [];
        for (let i = 0; i < response.DT.qa.length; i++) {
            let q = response.DT.qa[i];
            if (q.imageFile) {
                q.imageFile =
                    await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question${i}.png`, 'image/png');
            }
            newQA.push(q)
        }
        setQuestions(newQA);
        //console.log(newQA);
    }



    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: '',
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

    const handleOnChange = (questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].description = value;
            setQuestions(questionsClone);
        }

    }

    const handleFileChange = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswerChange = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value
                        }
                        if (type === 'INPUT') {
                            answer.description = value
                        }
                    }
                    return answer
                })

            setQuestions(questionsClone)
        }
    }

    const handleSubmitQuestion = async () => {

        // validate quiz input
        if (_.isEmpty(selectedOption)) {
            toast.error("Please choose the Quiz")
            return;
        }

        // validate question input:
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                toast.error(`Please fill in the question ${i + 1} input`)
                return;
            }
        }

        // validate answer input
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    toast.error(`Please fill in the answer ${j + 1} input of question ${i + 1} `)
                    return;
                }
            }
        }



        // Update QA
        let questionClonee = _.cloneDeep(questions);
        for (let i = 0; i < questionClonee.length; i++) {
            if (questionClonee[i].imageFile) {
                questionClonee[i].imageFile =
                    await toBase64(questionClonee[i].imageFile)
                questionClonee[i].imageFile = questionClonee[i].imageFile.split("base64,")[1]
            }
        }

        let responsee = await postUpsertQA({
            quizId: selectedOption.value,
            questions: questionClonee

        })

        if (responsee && responsee.EC === 0) {
            toast.success(responsee.EM)
            fetchQuizQA();
            console.log("qqq1", questions);
        }


        //setQuestions(initQuestions)



    }

    const handleClickPreviewImage = (previewImageFile) => {
        setIsPreview(true);
        SetPreviewImageUrl(previewImageFile)
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    console.log("qqq2", questions);
    //console.log(listQuiz);
    return (
        <div className="manage-question-container">
            {/* <div className="title">
                <h3>Manage Questions: </h3>
                <hr />
            </div> */}
            <div className="manage-question-content mt-5">
                <div className="quiz col-6 mt-3">
                    <h5>Select Quiz:</h5>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={listQuiz}
                    />
                </div>
                <h5 className='mt-4'>Add Question:</h5>
                <div className='quiz-content mt-3'>
                    {questions && questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <>
                                    <div key={question.id} className="question mt-5">
                                        <div className="q-input col-6">
                                            <label >Question {index + 1} 's description</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder='Description'
                                                value={question.description}
                                                onChange={(event) => handleOnChange(question.id, event.target.value)}
                                            />
                                        </div>
                                        <div className='q-img-upload'>
                                            <label
                                                className='img-upload-label'
                                                htmlFor={question.id}
                                            >
                                                <BsImages className='img' />
                                            </label>
                                            {/* <label
                                                className='img-upload-label'
                                                htmlFor={question.id}
                                            >Upload Image</label> */}
                                            <input
                                                id={question.id}
                                                type='file'
                                                hidden
                                                onChange={(event) => handleFileChange(question.id, event)}
                                            />
                                            {
                                                question.imageFile ?
                                                    <div className='q-img'>
                                                        {/* <img src={URL.createObjectURL(question.imageFile)} /> */}
                                                        {
                                                            isPreview === true
                                                                ?
                                                                <Lightbox
                                                                    onClose={() => setIsPreview(false)}
                                                                    image={URL.createObjectURL(previewImageUrl)}
                                                                    title="Image Title" />
                                                                :
                                                                <span
                                                                    onClick={() => handleClickPreviewImage(question.imageFile)}
                                                                >Preview Image</span>
                                                        }
                                                    </div>


                                                    : <span>0 files uploaded</span>}

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
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={answer.isCorrect}
                                                        id="flexCheckDefault"
                                                        onChange={(event) =>
                                                            handleAnswerChange('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                    />
                                                    <div className="a-input col-6">
                                                        <label >Answers {index + 1} </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={answer.description}
                                                            onChange={(event) =>
                                                                handleAnswerChange('INPUT', question.id, answer.id, event.target.value)}
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
                    {questions && questions.length > 0 &&
                        <div>
                            <button
                                className='btn btn-warning mt-3 mb-5'
                                onClick={() => handleSubmitQuestion()}
                            >Save Questions</button>
                        </div>


                    }

                </div>


            </div>

        </div>
    )
}


export default QuizQA