
import { useEffect, useState } from "react"
//import { getAllQuiz } from "../../../services/apiService"
import ModalUpdateQuiz from "./ModalUpdateQuiz/ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz/ModalDeleteQuiz";

const QuizTable = (props) => {

    // const [quizList, setQuizList] = useState([]);
    const { fetchAllQuiz, quizList } = props;
    const [dataUpdate, setDataUpdate] = useState({})
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false)
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)
    const [quizId, setQuizId] = useState()


    useEffect(() => {
        fetchAllQuiz()
    }, [])

    // const fetchAllQuiz = async () => {
    //     let data = await getAllQuiz();

    //     if (data && data.EC === 0) {
    //         setQuizList(data.DT)
    //     }
    // }

    const handleEditClick = (data) => {
        setDataUpdate(data)
        setShowModalUpdateQuiz(true)
    }

    const handleDeleteClick = (data) => {
        setShowModalDeleteQuiz(true)
        if (data) {
            setQuizId(data.id)
        }
        //console.log(typeof (data.id));
        //alert("messi")
    }
    return (
        <>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Description</th> */}
                        <th scope="col">Difficulty</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quizList && quizList.length > 0 &&
                        quizList.map((item, index) => {
                            return (
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    {/* <td>{item.description}</td> */}
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <div className="quiz-button-group">
                                            <button
                                                className="btn-edit btn btn-warning ml-3 btn-sm"
                                                onClick={() => handleEditClick(item)}
                                            >Edit</button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteClick(item)}
                                            >Delete</button>
                                        </div>
                                    </td>

                                </tr>
                            )
                        })

                    }


                </tbody>
            </table>
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchAllQuiz={fetchAllQuiz}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                quizId={quizId}
                fetchAllQuiz={fetchAllQuiz}
            />
        </>

    )
}

export default QuizTable