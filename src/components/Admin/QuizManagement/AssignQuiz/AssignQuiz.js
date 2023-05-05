import Select from 'react-select';
import { useEffect, useState } from 'react';
import { getAllQuiz, getAllUsers } from "../../../../services/apiService"
const AssignQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchAllQuiz()
        fetchAllUser()

    }, [])

    const fetchAllQuiz = async () => {
        let data = await getAllQuiz();

        const newData = data.DT.map(quiz => {
            return {
                value: quiz.id,
                label: `${quiz.id}-${quiz.description}`
            }
        })
        if (data && data.EC === 0) {
            setListQuiz(newData)
        }
    }

    const fetchAllUser = async () => {
        let data = await getAllUsers();
        console.log(data);
        const newData = data.DT.map(user => {
            return {
                value: user.id,
                label: `${user.id}-${user.username}-${user.email}`
            }
        })
        if (data && data.EC === 0) {
            setListUser(newData)
            //console.log(newData);
        }
    }
    return (
        <div className='assign-quiz-container row'>
            <div className="quiz col-6 mt-3">
                <h5>Select Quiz:</h5>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className="user col-6 mt-3">
                <h5>Select User:</h5>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div className='mt-3'>
                <button className='btn btn-warning'>Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz