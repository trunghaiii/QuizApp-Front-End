import CountDown from "./CountDown";

const RightContent = (props) => {
    const { questionData } = props;

    const timeUpAction = () => {
        props.handleFinish()
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
                            <div className="question">{index + 1}</div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default RightContent;