import React from "react";
import {Grid, Input,Button} from "semantic-ui-react";
import { get_latest_ship_info } from "../wscommunicator";


class MainPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            imo_list: ''
        }
    }

    componentDidMount(){

    }

    handle_imo_list_value_changed = (e) => {
        const value = e.target.value;
        this.setState({imo_list: value});
    }

    handle_find_clicked = () => {
        get_latest_ship_info({"imo_list":this.state.imo_list}).then(response =>{
            console.log("Response: ", response.data);
        })
    }

    render(){
        return <div>
            <div style={{'width':'100%', 'height':'120px'}}>
                <Grid.Column className="header">
                    <Grid.Row>
                        <div style={{'width':'70%', 'marginLeft':'15%'}}>
                            <Grid columns={2} divided>

                                <Grid.Row>
                                    <Grid.Column width={5}>
                                                <img style={{'maxWidth':'250px', "maxHeight":'100px'}} src={require('../assets/marine_logo.png')} alt='logo' />
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <div
                                        style={{
                                            'display':'flex',
                                            'justify-content':'center',
                                            'marginTop':'20px'
                                            }}>
                                            <Grid.Column>
                                                <Grid.Row>
                                                    <h1>Gemi Takip Sistemi</h1>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <p style={{'fontSize':'13px'}}>IMO numarası ile gemi takibi</p>
                                                </Grid.Row>
                                            </Grid.Column>
                                             </div>
                                         </Grid.Column>
                                </Grid.Row>
                            </Grid>
                                
                          
                        </div>
                    </Grid.Row>
                </Grid.Column>
            </div>
            <Grid.Column>
                <Grid.Row className="body">
                    <p style={{"color":"black", "fontSize":"14px", "textAlign":"left", "marginBottom":"2px"}}>Takip etmek istediğiniz gemilerin IMO numaralarını <b>aralarına virgül koyarak</b> giriniz. Ardından <b>BUL</b> tuşuna basınız.</p>
                    
                    <div style={{"display":"flex"}}>
                         <Input 
                                style={{"height":"40px", "width":"85%", "fontSize":"14px"}} 
                                onChange={this.handle_imo_list_value_changed}
                                fluid 
                                placeholder='Buraya Giriniz...' />
                             <Button style={{"width": "14%", "marginLeft":"1%"}} onClick={this.handle_find_clicked}>BUL</Button>
                    </div>


    
                    

                  

                    {/* <Tab panes={[{
                                    menuItem: "Krediler",
                                    render: (props) =>  <CredistPage/>
                                },
                                {
                                    menuItem: "Menkul Kıymet",
                                    render: (props) =>  <div/>
                            }]}
                          // onTabChange={this.setAllParamsToDefault}
                    ></Tab> */}
                </Grid.Row>
             </Grid.Column>

        </div>
    }

    // render(){
    //     <div style={{"backgroundColor":"red"}}>
    //         <div style={{'width':'100%', 'height':'100px', 'backgroundColor':'white'}}>
    //                 <Grid.Column className="header">
    //                     <Grid.Row >
    //                         <div style={{'width':'70%', 'marginLeft':'15%'}}>
    //                             <Grid columns={2} divided>
    //                                 <Grid.Row>
    //                                     <Grid.Column width={5}>
    //                                         <img style={{'maxWidth':'250px'}} src={require('../assets/tcmb_logo.png')} alt='logo' />
    //                                     </Grid.Column>
    //                                     <Grid.Column width={10}>
    //                                         <div
    //                                             style={{
    //                                                 'display':'flex',
    //                                                 'justify-content':'center',
    //                                                 'align-items':'center'
    //                                             }}>
    //                                                 <Grid.Column>
    //                                                     <Grid.Row>
    //                                                         <h2>Bankacılık Stres Testi Ekranı</h2>
    //                                                     </Grid.Row>
    //                                                     <Grid.Row>
    //                                                     <p style={{'fontSize':'13px'}}>Finansal İnovasyon Genel Müdürlüğü</p>
    //                                                     </Grid.Row>
    //                                                 </Grid.Column>
    //                                         </div>
    //                                     </Grid.Column>
    //                                 </Grid.Row>
    //                             </Grid>
    //                         </div>
    //                     </Grid.Row>
    //                 </Grid.Column>
    //         </div>
    //         <Grid.Column>
    //             <Grid.Row className="body">
    //                 <Tab  panes={[
    //                     {
    //                         menuItem: "İzleme Ekranı",
    //                         render: (props) =>  <div/>
    //                     },
    //                     {
    //                         menuItem: "İzleme Ekranı2",
    //                         render: (props) =>  <div/>
    //                     }
    //                 ]}
    //                 // onTabChange={this.setAllParamsToDefault}
    //                 ></Tab>
    //             </Grid.Row>
    //         </Grid.Column>
    //     </div>
    // }
}

export default MainPage;
