
const RightContent = (props) => {
    const { questionData } = props;

    //console.log(questionData);
    return (
        <>
            <div className="time-countdown">
                <div className="time-text">10:10</div>
            </div>
            <div className="question-container">
                {questionData && questionData.length > 0

                    && questionData.map((items, index) => {
                        return (
                            <div className="question">{index + 1}</div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default RightContent;