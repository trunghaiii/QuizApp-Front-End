import _ from "lodash"
const Question = (props) => {

    const { index, questionData } = props
    if (_.isEmpty(questionData)) {
        return (<></>)
    }

    const handleCheckBox = (event, questionId, answerId) => {
        console.log(event.target.checked, `q-${questionId} a-${answerId}`);
        props.handleCheckBoxData(questionId, answerId)
    }
    //console.log(questionData);
    return (
        <>
            {questionData.image ?
                <div className='image'>
                    <img src={`data:image/jpeg;base64,${questionData.image}`} />
                </div>
                :
                <div className='image'>

                </div>
            }
            <div className='question'>Question {index + 1}: {questionData.questionDescription}</div>
            <div className='answer'>
                {questionData.answers && questionData.answers.length > 0 &&
                    questionData.answers.map((ans, indexx) => {
                        return (
                            <>
                                <div key={`an-${indexx}`} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked={ans.isSelected}
                                        onChange={(event) => handleCheckBox(event, questionData.questionId, ans.id)}
                                    />
                                    <label className="form-check-label">
                                        {ans.description}
                                    </label>
                                </div>
                            </>
                            // {/* <div className='a-child'>{ans.description}</div> */ }
                        )
                    })}
            </div>
        </>
    )
}

export default Question