
import Select from 'react-select';
import "./QuizManagement.scss"
import { useState } from 'react';
import { postAddingNewQuiz, getAllQuiz } from "../../../services/apiService"
import { toast } from "react-toastify"
import QuizTable from './QuizTable';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA/QuizQA';
import AssignQuiz from './AssignQuiz/AssignQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const QuizManagement = (props) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("EASY")
    const [image, setImage] = useState(null)
    const [quizList, setQuizList] = useState([]);

    const handleUploadImage = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
            //console.log(event.target.files[0]);
        } else {
            setImage(null);
        }
    }

    const handleAddingQuiz = async () => {
        let data = await postAddingNewQuiz(name, description, type?.value, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            setName("")
            setDescription("")
            //setType("")
            setImage(null)
            fetchAllQuiz()
        } else {
            toast.error(data.EM)
        }

        //console.log(data);
        //alert("okla")
    }

    const fetchAllQuiz = async () => {
        let data = await getAllQuiz();

        if (data && data.EC === 0) {
            setQuizList(data.DT)
        }
    }
    return (
        <div className="quiz-manage-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Quiz Mangement</Accordion.Header>
                    <Accordion.Body>
                        <hr />
                        <h4 className='mb-5'>Add a new Quiz:</h4>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label >Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <label>Description</label>
                        </div>
                        <div className='mb-2'>
                            <Select
                                defaultValue={type}
                                onChange={setType}
                                placeholder={"Quiz Difficulty..."}
                                options={options}
                            />
                        </div>
                        <div >
                            <label className='mb-2'>Upload Image</label>
                            <input
                                className="form-control"
                                type="file"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div>
                            <button
                                className='btn btn-warning mt-4'
                                onClick={() => handleAddingQuiz()}
                            >Save</button>
                        </div>

                    </Accordion.Body>
                    <Accordion.Body>
                        <h5 className='mt-4'>Quiz List: </h5>
                        <div className='quiz-list mt-2'>
                            <QuizTable
                                quizList={quizList}
                                fetchAllQuiz={fetchAllQuiz}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quiz</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign Quiz to User</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>



        </div>
    )
}



export default QuizManagement;