import { string } from "prop-types";
import React from "react";
import {Input} from "semantic-ui-react";

class IncrementalInput extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: this.props.default_value,
            value_seen: this.props.default_value
        }
    }

    // when "+" button is clicked
    handle_value_increased = () => {
        if(this.props.data_type === "int"){
            const updated_value = parseInt(this.state.value) + parseInt(this.props.change_amount.toFixed(2))
            this.setState({value: updated_value, value_seen: updated_value}, ()=>{
                this.props.incremental_input_value_changed(this.props.input_id, updated_value)
            })
        }
        else{
            //float
            var updated_value = parseFloat(this.state.value) + parseFloat(this.props.change_amount.toFixed(2))
            updated_value = Math.round((updated_value + Number.EPSILON) * 100) / 100 
            this.setState({value: updated_value, value_seen: updated_value}, ()=>{
                this.props.incremental_input_value_changed(this.props.input_id, updated_value)
            })
        }
    }

    // when "-" button is clicked
    handle_value_descreased = () => {
        if(this.props.data_type === "int"){
            const updated_value = parseInt(this.state.value) - parseInt(this.props.change_amount.toFixed(2))
            this.setState({value: updated_value, value_seen: updated_value}, ()=>{
                this.props.incremental_input_value_changed(this.props.input_id, updated_value)
            })
        }
        else{
            //float
            var updated_value = parseFloat(this.state.value) - parseFloat(this.props.change_amount.toFixed(2))
            updated_value = Math.round((updated_value + Number.EPSILON) * 100) / 100 
            this.setState({value: updated_value, value_seen: updated_value}, ()=>{
                this.props.incremental_input_value_changed(this.props.input_id, updated_value)
            })

        }
      
    }

    // when user directly changed the input 
    handle_value_changed = (e) => {
        if(e.target.value === "" || e.target.value === "-"){
            this.setState({value_seen: ""})
        }
        else{
            if(this.props.data_type === "int"){
                const updated_value = parseInt(e.target.value)
                this.setState({value: updated_value, value_seen: updated_value},()=>{
                    this.props.incremental_input_value_changed(this.props.input_id, updated_value)
                })
            }
            else{
                // float
                const updated_value = parseFloat(e.target.value)

                //updated_value = Math.round((updated_value + Number.EPSILON) * 100) / 100
                this.setState({value: updated_value, value_seen: updated_value},()=>{
                    this.props.incremental_input_value_changed(this.props.input_id, updated_value)
                })
            }
        } 
    }

    render(){
        return <div style={{"width":"100%"}}>
            <p className='incremental_input_title'>{this.props.title}</p>
            <div style={{"display":"flex", "flexDirection":"row", "justifyContent":"space-between", "width":"100%"}}>
                <div style={{"marginRight":"3px", "width":"100%"}}>
                    <Input 
                        // placeholder={this.props.default_value} 
                        onChange={this.handle_value_changed}
                        
                        value={this.state.value_seen}
                        size="small"  
                        style={{"width": "100%", "height":"37px"}} 
                    />
                </div>
                <div style={{"height":"31px", "flexDirection":"column"}}>
                    <div style={{"textAlign":"center", "fontSize":"10px"}}>
                        <button onClick={this.handle_value_increased}  style={{"width":"30px"}}>+</button>
                    </div>
                    <div style={{"textAlign":"center", "fontSize":"10px"}}>
                        <button onClick={this.handle_value_descreased} style={{"width":"30px"}}>-</button>
                    </div>
                </div>
            </div>
        </div>
    }

    // render(){
    //     return <div style={{"width":"235px"}}>
    //         <p className='incremental_input_title'>{this.props.title}</p>
    //         <div style={{"display":"flex", "flexDirection":"row", "justifyContent":"space-between", "width":"200px"}}>
    //             <div style={{"marginRight":"3px"}}>
    //                 <Input 
    //                     // placeholder={this.props.default_value} 
    //                     onChange={this.handle_value_changed}
    //                     fluid
    //                     value={this.state.value_seen}
    //                     size="small"  
    //                     style={{"width": "200px", "height":"37px"}} 
    //                 />
    //             </div>
    //             <div style={{"height":"31px", "flexDirection":"column"}}>
    //                 <div style={{"textAlign":"center", "fontSize":"10px"}}>
    //                     <button onClick={this.handle_value_increased}  style={{"width":"30px"}}>+</button>
    //                 </div>
    //                 <div style={{"textAlign":"center", "fontSize":"10px"}}>
    //                     <button onClick={this.handle_value_descreased} style={{"width":"30px"}}>-</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // }
}
export default IncrementalInput;
