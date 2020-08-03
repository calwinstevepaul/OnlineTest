import React, { Component } from 'react'


export class QuestionMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menu: false
        }
    }


    render() {
        const { onClick, state } = this.props;
        return (
            <div>
                <div className={this.state.menu ? 'selectedMenu' : 'menubutton'} onClick={(event) => { event.stopPropagation(); this.setState({ menu: !this.state.menu }) }}>
                    <i className="fas fa-ellipsis-v"></i>
                </div>
                {this.state.menu
                    ?
                    <div>
                        <div onClick={() => this.setState({ menu: false })} className='close'>

                        </div>
                        <div className='questionMenu'>
                            <ul>
                                <li onClick={() => onClick('edit')}>EDIT</li>
                                <li onClick={()=> onClick('delete')}>DELETE</li>
                                <li onClick={()=> {onClick('active');this.setState({menu:false})}}>{state ? 'LIVE' : 'START'}</li>
                            </ul>
                        </div>
                    </div>
                    :
                    <></>
                }

            </div>
        )
    }
}

export default QuestionMenu
