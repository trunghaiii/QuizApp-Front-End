import CountDown from "./CountDown";

const RightContent = (props) => {
    const { questionData } = props;

    const timeUpAction = () => {
        props.handleFinish()
    }

    const handleDoneQuestion = (question) => {
        //console.log(question);
        const isAnswered = question.answers.find(a => a.isSelected === true);
        if (isAnswered) {
            return "question selected"
        }
        return "question"
    }

    const handleClickQuestion = (index) => {
        props.setIndex(index)
    }

    //console.log(questionData);
    return (
        <>
            <div className="time-countdown">
                <CountDown
                    timeUpAction={timeUpAction}
                />
            </div>
            <div className="question-container">
                {questionData && questionData.length > 0

                    && questionData.map((items, index) => {
                        return (
                            <div
                                className={handleDoneQuestion(items)}
                                onClick={() => handleClickQuestion(index)}
                            >{index + 1}</div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default RightContent;