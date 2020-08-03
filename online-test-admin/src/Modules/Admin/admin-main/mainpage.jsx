import React, { Component } from 'react'
import './mainpage.css'
import { authApi } from '../../../apicall'
import DashbordHead from '../../../Components/DashboardHead/dashbordHead'
import SmallList from '../../../Components/SmallList/smallList'
import AdminMainContainer from '../../../Components/admin-main-container/adminMainContainer'
import SimpleHead from '../../../Components/SimpleHeading/simpleHead'
import swal from 'sweetalert'
import Barchart from '../../../Components/Graph/Barchart'

export class mainpage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            question: [],
            users: [],
            questionsMenu: false,
            pageLimit: 0,
            dataLength: 0,
            onlineUsersCount:0,
            chartData: []

        }
    }
    componentDidMount() {
        this.getQuestions()
        this.getUsers()
        this.getOnlineUsers()
        this.getChartData()
    }
    getQuestions = () => {
        var page = this.state.pageLimit + 1
        authApi.get(`/questions?limit=7&page=${this.state.pageLimit}`).then(res => {
            this.setState({
                question: [...this.state.question, ...res.data.data],
                pageLimit: page,
                dataLength: res.data.count
            })
        })

    }

    getUsers = () => {
        authApi.get('/users', {}).then(res => {
            this.setState({
                users: res.data.data
            })
        })
    }

    getOnlineUsers =() =>{
        authApi.post('/users/onlineUsersCount').then(res => {            
            
            this.setState({
                onlineUsersCount:parseInt(res.data.onlineUsersCount)
            })
            
        })

    }
    menuQuestion = (details, action) => {
        const { setcurrentPage, onEdit } = this.props;
        if (action === 'edit') {
            onEdit(details)
            setcurrentPage(5)
        } else if (action === 'delete') {
            authApi.delete('/questions/' + details._id)
                .then(data => {
                    swal({ text: `The Question ${details.title.toUpperCase()} deleted`, icon: "success" })
                    this.setState((pre) => {
                        return {
                            question: pre.question.filter(e => e._id !== details._id)
                        }
                    })
                })
                .catch(err => console.log(err))
        } else if (action === 'active') {
            authApi.get('/questions/active/' + details._id)
                .then(res => {
                    if (res.status === 200) {
                        
                        let { question } = this.state;
                        if (question[question.indexOf(question.find(q => q.active))]) question[question.indexOf(question.find(q => q.active))].active = false
                        question[question.indexOf(question.find(q => q._id === details._id))].active = true
                        this.setState({ question })
                        console.log(question, details)
                        swal({ text: `The Question ${details.title.toUpperCase()} is Live Now!!!`, icon: "success" })
                    }
                })
                .catch(err => console.log(err))
        }

    }
    handlescroll = event => {
        const bottom = (event.target.scrollHeight - parseInt(event.target.scrollTop)) === (event.target.clientHeight)
        const { dataLength, question } = this.state;

        if (bottom && dataLength !== question.length) {
            this.getQuestions()
        }
    }

    getChartData=()=>{
        authApi.post('/users/chart', {}).then(res => {
           this.setState({
               chartData:res.data
           })
        })
   }

    render() {
        const { heading  } = this.props;
        const { chartData } = this.state
        const Items = heading === 'Questions' ? this.state.question : this.state.users
        const dashbordValues = [
            { title: 'TOTAL STUDENTS ATTENDED', value: this.state.users.length },
            { title: 'TOTAL QUESTIONS', value: this.state.dataLength },
            { title: 'STUDENTS ONLINE', value: this.state.onlineUsersCount }
        ]
        return (
            <AdminMainContainer>
                <SimpleHead heading="DASHBOARD" />
                <DashbordHead values={dashbordValues} page="mainpage" />
                <div className="mainpage-admin-3">
                    <div className="mainpage-admin-3-1">
                        <div className="mainpage-admin-3-1-1">TOTAL STUDENTS ATTENDED</div>
                        {/* <LineChart /> */}
                            <Barchart data={chartData}/>
                    </div>

                    <SmallList
                        heading={heading}
                        items={Items}
                        onClick={item => {
                        }}
                        menuQuestion={this.menuQuestion}
                        scrollHandler={this.handlescroll} 
                    />
                </div>

            </AdminMainContainer>
        )
    }
}

export default mainpage
