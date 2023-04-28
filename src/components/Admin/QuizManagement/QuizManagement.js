
import Select from 'react-select';
import "./QuizManagement.scss"
import { useState } from 'react';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const QuizManagement = (props) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("EASY")
    const [image, setImage] = useState("")

    const handleUploadImage = () => {

    }
    return (
        <div className="quiz-manage-container">
            <div className="quiz-title">
                Quiz Mangement
            </div>
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
                    value={type}
                    // onChange={this.handleChange}
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

        </div>
    )
}



export default QuizManagement;