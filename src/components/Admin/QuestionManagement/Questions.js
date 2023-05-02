
import Select from 'react-select';
import "./Questions.scss"
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const Questions = (props) => {
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
                <div className="question">
                    <div className="q-input col-6">
                        <input type="email" className="form-control" placeholder='Description' />
                    </div>
                    <div className='q-img-upload'>
                        <label className='img-upload-label'>Upload Image</label>
                        <input type='file' hidden />
                        <span>0 files uploaded</span>

                    </div>
                    <span ><BsPatchPlusFill className='add-q' /></span>
                    <span ><BsPatchMinusFill className='remove-q' /></span>

                </div>
                <div className="answer mt-3">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <div className="a-input col-6">
                        <input type="text" className="form-control" placeholder="Answer 1" />
                    </div>
                    <span><AiFillPlusSquare className='add-a' /></span>
                    <span><AiFillMinusSquare className='remove-a' /></span>
                </div>
            </div>

        </div>
    )
}


export default Questions