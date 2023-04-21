import React from "react";
import {Accordion, Menu} from "semantic-ui-react";

class InputAccordion extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            active:false
        }
    } 

    handleClick = () => {
        this.setState({active: !this.state.active})
    }

    render(){
        return <Accordion fluid as={Menu} vertical style={{"width":"260px"} }>
                    <Menu.Item>
                        <Accordion.Title
                            active={this.state.active}
                            content={this.props.title}
                            index={0}
                            onClick={this.handleClick}
                        />
                        <Accordion.Content active={this.state.active} content={this.props.incremental_inputs} />
                    </Menu.Item>
                </Accordion>
    }
}
export default InputAccordion;
