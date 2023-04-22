import _ from "lodash"
const Question = (props) => {

    const { index, questionData } = props
    if (_.isEmpty(questionData)) {
        return (<></>)
    }

    return (
        <>
            {questionData.image &&
                <div className='image'>
                    <img src={`data:image/jpeg;base64,${questionData.image}`} />
                </div>
            }
            <div className='question'>Question {index + 1}: {questionData.questionDescription}</div>
            <div className='answer'>
                {questionData.answers && questionData.answers.length > 0 &&
                    questionData.answers.map((ans, indexx) => {
                        return (
                            <>
                                <div key={`an-${indexx}`} className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" />
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