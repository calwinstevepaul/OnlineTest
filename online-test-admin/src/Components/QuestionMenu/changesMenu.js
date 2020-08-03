import React, { Component } from 'react'

export class ChangesMenu extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             menu:false
        }
    }
    
    render() {
        const { array, item, setarray } = this.props;
        const selection = (array[0]===0 && array[1]===0)
                                ?'select for compare'
                                :(array[0]===item || array[1]===item)
                                    ?'unselect':'compare with selected'
        const returnArray = (selection==='select for compare')
                                ?[item,0]
                                :(selection==='unselect')
                                    ?(array[0]===item)?[array[1],0]:[array[0],0]
                                    :[array[0],item]
        return (
            <div >
                <div className={this.state.menu?'selectedMenu':'menubutton'}  onClick={(event)=>{event.stopPropagation();this.setState({menu:!this.state.menu})}}>
                    <i  className="fas fa-ellipsis-v"></i>
                </div>  
                {this.state.menu
                ?
                    <div>
                        <div onClick={()=>this.setState({menu:false})} className='close'>

                        </div>
                        <div className='questionMenu'>
                            <ul>
                                <li onClick={_=>setarray(returnArray)}>{selection}</li>
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

export default ChangesMenu
