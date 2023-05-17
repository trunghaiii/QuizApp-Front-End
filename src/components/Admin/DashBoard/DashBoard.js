import "./DashBoard.scss"
import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar, YAxis } from 'recharts';

const DashBoard = () => {
    const data = [
        {
            "name": "Users",
            "user": 10,
        },
        {
            "name": "Admins",
            "admin": 11,
        },
        {
            "name": "Quizs",
            "quiz": 10,
        },
        {
            "name": "Questions",
            "question": 15,
        }
    ]
    return (
        <div className="dashboard-container">
            <div className="l-content">
                <div className="total total-users">
                    <div className="title">Total Users</div>
                    <div className="number">10</div>
                </div>
                <div className="total total-admins">
                    <div className="title"> Total Admins</div>
                    <div className="number">10</div>
                </div>
                <div className="total total-quizs">
                    <div className="title"> Total Quizs</div>
                    <div className="number">10</div>
                </div>
                <div className="total total-questions">
                    <div className="title"> Total Questions</div>
                    <div className="number">10</div>
                </div>
            </div>
            <div className="r-content">
                <BarChart width={500} height={300} data={data}>
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