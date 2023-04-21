import React from "react";
import { Grid, Dropdown, Input, Button, Icon, Placeholder, Label } from "semantic-ui-react";
import IncrementalInput from "./IncrementalInput";
import InputAccordion from "./InputAccordion";
import { BANK_OPTIONS,  
    MONEY_TYPE_OPTIONS, 
    CURRENCY_OPTIONS } from "../Constants";


class ParameterPanel extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }
  
    // a helper function to check if a number is an integer or float
    isInt = (n) => {
        return n % 1 === 0;
     }

    build_incremental_inputs_from_data = (incremental_inputs_anapara_data, incremental_inputs_ortalama_vade_data) => {
        var anapara_buyume_orani_inputs = [];
        var ortalama_vade_inputs = [];
        Object.keys(incremental_inputs_anapara_data).forEach(item => {
            //var name = item.split(' ').join('_');
            const value = incremental_inputs_anapara_data[item]
            var data_type = "float"
            var change_amount = 0.01
            if(this.isInt(value)){ 
                data_type = "int" 
                change_amount = 1
            }
            anapara_buyume_orani_inputs.push(<IncrementalInput 
                // input_id={"anapara_buyume_orani_" + name.toLowerCase()}
                input_id={"anapara_" + item}
                data_type={data_type}
                title={item}
                default_value={value}
                change_amount={change_amount}
                incremental_input_value_changed={this.incremental_input_value_changed}
        />);
        })
        Object.keys(incremental_inputs_ortalama_vade_data).forEach(item => {
            //var name = item.split(' ').join('_');
            const value = incremental_inputs_ortalama_vade_data[item]
            var data_type = "float"
            var change_amount = 0.01
            if(this.isInt(value)){ 
                data_type = "int" 
                change_amount = 1
            }
            ortalama_vade_inputs.push(<IncrementalInput 
                    //input_id={"ortalama_vade_" + name.toLowerCase()}
                    input_id={"vade_" + item}
                    data_type={data_type}
                    title={item}
                    default_value={value}
                    change_amount={change_amount}
                    incremental_input_value_changed={this.incremental_input_value_changed}
            />);
        })
        return {"anapara": anapara_buyume_orani_inputs, "ortalama_vade":ortalama_vade_inputs} 
    }

    build_inputs = (type) => {
        const incremental_inputs = this.build_incremental_inputs_from_data(this.props.incremental_inputs_anapara_data, this.props.incremental_inputs_ortalama_vade_data)
        if(type==="anapara"){
            return incremental_inputs.anapara
        }
        else{
            return incremental_inputs.ortalama_vade
        }
    }

 
    // GENERATING OPTIONS FOR DROPDOWNS

    generate_bank_name_options = () => {
        var bank_name_options = [];
        this.props.all_banks_in_given_type.forEach(item => {
            bank_name_options.push({
                key: item.toLowerCase(),
                text: item,
                value: item,
            });
        })
        bank_name_options = bank_name_options.sort((bank1, bank2) => (bank1.key.toLowerCase() > bank2.key.toLowerCase())? 1: -1)
        return bank_name_options;
    }

    generate_donem_options = () => {
        var donem_options = [];
        this.props.periods.forEach(item => {
            donem_options.push({
                key: item,
                text: item,
                value: item,
            });
        })
        donem_options = donem_options.sort((period1, period2) => (period1.key > period2.key)? 1: -1)
        return donem_options;
    }

    generate_currency_options = () => {
        var currency_options = [];
        this.props.currencies.forEach(item => {
            currency_options.push({
                key: item,
                text: item,
                value: item,
            });
        })
        currency_options = currency_options.sort((currency1, currency2) => (currency1.key > currency2.key)? 1: -1)
        return currency_options;
    }

    // EVENT HANDLERS

    handleBankTypeChange = (e, data) => {
        this.props.handleBankTypeChange(data.value);
    }

    handleBankNameChange = (e, data) => {
        this.props.handleBankNameChange(data.value);
    }

    handlePeriodChange = (e, data) => {
        this.props.handlePeriodChange(data.value);
    } 

    handleCurrencyChange = (e, data) => {
        this.props.handleCurrencyChange(data.value);
    }

    incremental_input_value_changed = (input_id, value) => {
        this.props.incremental_input_value_changed(input_id, value)
    }

    // RENDER FUNCTIONS

    render_credits_page_parameters = () => {
        return <div>
            <Grid columns={4} divided>
                <Grid.Row>
                    <Grid.Column>
                        <p className='dropdown-title'>Dönem</p>
                        <Dropdown
                            disabled={this.props.loading}
                            fluid
                            selection
                            options={this.generate_donem_options()}
                            onChange={this.handlePeriodChange}
                            value={this.props.selected_period}
                            placeholder={this.props.selected_period}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <p className='dropdown-title'>Para Birimi</p>
                        <Dropdown
                            disabled={this.props.loading}
                            fluid
                            selection
                            options={this.generate_currency_options()}
                            onChange={this.handleCurrencyChange}
                            value={this.props.selected_currency}
                            placeholder={this.props.selected_currency}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <p className='dropdown-title'>Banka Tipi</p>
                        <Dropdown
                            disabled={this.props.loading}
                            fluid
                            selection
                            options={BANK_OPTIONS}
                            onChange={this.handleBankTypeChange}
                            value={this.props.bank_type}
                            placeholder={this.props.bank_type}
                        />
                    </Grid.Column>
                    <Grid.Column>
                            <p className='dropdown-title'>Banka Adı</p>
                            <Dropdown
                                placeholder={'Tümü'}
                                disabled={this.props.loading}
                                search
                                // floating
                                fluid
                                scrolling
                                multiple
                                selection
                                options={this.generate_bank_name_options()}
                                onChange={this.handleBankNameChange}
                                value={this.props.bank_list.length > 9 ? 'Tümü' : this.props.bank_list}
                                style={{'wordBreak':'break-all', 'zIndex':998}}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
           
            <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column width={7}>
                        <InputAccordion
                            title="Ana Para Büyüme Oranı"
                            incremental_inputs={this.build_inputs("anapara")}
                            incremental_input_value_changed={this.incremental_input_value_changed}
                        />
                    </Grid.Column>
                    <Grid.Column  width={7}>
                        <InputAccordion
                            title="Ortalama Vade"
                            incremental_inputs={this.build_inputs("ortalama_vade")}
                            incremental_input_value_changed={this.incremental_input_value_changed}
                        />
                    </Grid.Column>
                    <Grid.Column width={2}> 
                            <Button loading={this.props.loading} fluid onClick={this.props.handleCalculate}>Hesapla</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    }

    // MAIN RENDER FUNCTION
    render(){
        return <div className="parameter_panel">
            {this.props.parent_page_id === "credits" && this.render_credits_page_parameters()}
        </div>
    }
}
export default ParameterPanel;


