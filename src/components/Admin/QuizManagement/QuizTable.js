
import { useEffect, useState } from "react"
import { getAllQuiz } from "../../../services/apiService"

const QuizTable = (props) => {

    const [quizList, setQuizList] = useState([]);

    useEffect(() => {
        fetchAllQuiz()
    }, [])

    const fetchAllQuiz = async () => {
        let data = await getAllQuiz();

        if (data && data.EC === 0) {
            setQuizList(data.DT)
        }
    }
    return (
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
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
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button className="btn-edit btn btn-warning ml-3">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>

                            </tr>
                        )
                    })

                }


            </tbody>
        </table>
    )
}

export default QuizTable