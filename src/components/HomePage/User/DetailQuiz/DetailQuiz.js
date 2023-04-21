import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuiz } from '../../../../services/apiService'
import _ from "lodash"
const DetailQuiz = (props) => {

    const param = useParams();
    const quizId = param.id;

    useEffect(() => {
        fetchQuestions()
    }, [quizId])

    const fetchQuestions = async () => {
        let data = await getDataQuiz(quizId)
        if (data && data.EC === 0) {
            let rawData = data.DT
            //console.log(rawData);
            let customizedData = _.chain(rawData)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription
                    let image

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        let quizanswer_description = item.quizanswer_description
                        let quizanswer_id = item.quizanswer_id
                        answers.push({ id: quizanswer_id, description: quizanswer_description })
                    })
                    //console.log(value);
                    return { questionId: key, answers, questionDescription, image }

                })
                .value()
            console.log(customizedData);
        }
    }
    return (
        <div>
            the quiz detail
        </div>
    )
}

export default DetailQuiz