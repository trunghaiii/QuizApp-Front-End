import "./DashBoard.scss"
import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar, YAxis } from 'recharts';
import { getDashBoardOverview } from "../../../services/apiService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"

const DashBoard = () => {
    const [dashboardData, setdashboardData] = useState([])

    useEffect(() => {
        fetchDashBoardData()
    }, [])

    const fetchDashBoardData = async () => {
        let response = await getDashBoardOverview();
        if (response && response.EC === 0) {
            const data = [
                {
                    "name": "Users",
                    "user": response?.DT?.totalUser,
                },
                {
                    "name": "Admins",
                    "admin": response?.DT?.totalAdmin,
                },
                {
                    "name": "Quizs",
                    "quiz": response?.DT?.totalQuiz,
                },
                {
                    "name": "Questions",
                    "question": response?.DT?.totalQuestion,
                }
            ]

            setdashboardData(data)
        } else {
            toast.error(response.EM)
        }
        //console.log(response);
    }

    return (
        <div className="dashboard-container">
            <div className="l-content">
                <div className="total total-users">
                    <div className="title">Total Users</div>
                    <div className="number">{dashboardData[0]?.user}</div>
                </div>
                <div className="total total-admins">
                    <div className="title"> Total Admins</div>
                    <div className="number">{dashboardData[1]?.admin}</div>
                </div>
                <div className="total total-quizs">
                    <div className="title"> Total Quizs</div>
                    <div className="number">{dashboardData[2]?.quiz}</div>
                </div>
                <div className="total total-questions">
                    <div className="title"> Total Questions</div>
                    <div className="number">{dashboardData[3]?.question}</div>
                </div>
            </div>
            <div className="r-content">
                <BarChart width={500} height={300} data={dashboardData}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="user" fill="#8884d8" />
                    <Bar dataKey="admin" fill="#82ca9d" />
                    <Bar dataKey="quiz" fill="red" />
                    <Bar dataKey="question" fill="blue" />
                </BarChart>
            </div>
        </div>

    )
}

export default DashBoard;