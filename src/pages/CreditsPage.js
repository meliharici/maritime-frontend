import React from "react";
import { Grid } from "semantic-ui-react";
import ParameterPanel from "../components/ParameterPanel";
import { banks } from "../Constants";

class CredistPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            periods: ["2023-01", "2023-02", "2023-03"],
            selected_period: "2023-01",
            currencies: ["TL", "USD"],
            selected_currency: "TL",
            selected_bank_type: "Tüm Bankalar",
            selected_bank_list: banks["Tüm Bankalar"],
            anapara_buyume_orani: {
                "Bireysel": 0.003,
                "Enerji ve Madencilik": 0.001,
                "Diger": 0.02
            },
            ortalama_vade: {
                "Bireysel": 1,
                "Enerji ve Madencilik": 2,
                "Diger": 2
            },
            faiz:{
                "2023-01":25,
                "2023-02":25,
                "2023-03":26,
                "2023-04":27,
                "2023-05":25,
                "2023-06":24,
                "2023-07":27,
                "2023-08":28,
                "2023-09":30,
                "2023-10":29,
                "2023-11":25,
                "2023-12":25,
            },
            kur:{
                "2023-01":19,
                "2023-02":19.5,
                "2023-03":20,
                "2023-04":20.5,
                "2023-05":21,
                "2023-06":21,
                "2023-07":22.7,
                "2023-08":22,
                "2023-09":23.3,
                "2023-10":23,
                "2023-11":24.6,
                "2023-12":24,
            }
        }
    }

    componentDidMount(){
        this.fetch_inputs_data()
    }

    // burada ilk parametreler (donemler, currencies, bank_lists, anapara_buyume_orani, ortalama_vade, faiz, kur) çekilip, state güncellenecek daha ilk başta..
    fetch_inputs_data = () => {
       
    }

    // HANDLERS

    handleBankTypeChange = (bank_type) => {
        this.setState({selected_bank_type: bank_type})
    }

    handleBankNameChange = (bank_names) => {
        this.setState({selected_bank_list: bank_names})
    }

    handlePeriodChange = (period) => {
        this.setState({selected_period: period})
    }

    handleCurrencyChange = (currency) => {
        this.setState({selected_currency: currency})
    }

    draggable_data_changed = (id, key, value) => {
        if(id === "faiz"){
            var faiz = this.state.faiz;
            faiz[key] = value;
            this.setState({faiz})
        }
        else if(id === "kur"){
            var kur = this.state.kur;
            kur[key] = value;
            this.setState({kur})
        }
        else{
            console.log("Error invalid input id: ", id)
        }
    }

    incremental_input_value_changed = (input_id, value) => {
        const partitions = input_id.split('_')
        const input_type = partitions[0]
        const input_name = partitions[1]
        if(input_type === "anapara"){
            var anapara_buyume_orani_dict = this.state.anapara_buyume_orani
            anapara_buyume_orani_dict[input_name] = value
            this.setState({anapara_buyume_orani: anapara_buyume_orani_dict})
        }
        else if(input_type === "vade"){
            var ortalama_vade_dict = this.state.ortalama_vade
            ortalama_vade_dict[input_name] = value
            this.setState({ortalama_vade: ortalama_vade_dict})
        }
        else{
            console.log("Invalid input type. It must be anapara or vade.");
        }
    }
  

    // CALCULATE FUNCTION

    handleCalculate = () => {
        console.log("Krediler için hesaplama başlıyor...");
        console.log("Parametreler şu şekilde:");
        console.log("Dönem: ", this.state.selected_period);
        console.log("Para Birimi: ", this.state.selected_currency);
        console.log("Banka Tipi: ", this.state.selected_bank_type);
        console.log("Kurlar: ", this.state.kur);
        console.log("Faizler: ", this.state.faiz);
        console.log("Anapara Büyüme Oranları: ", this.state.anapara_buyume_orani);
        console.log("Ortalama Vadeler: ", this.state.ortalama_vade);
        console.log("Banka Listesi: ", this.state.selected_bank_list)
    }

    render(){
        return <div className="credits_page">
            <Grid.Column>
                <ParameterPanel 
                    parent_page_id="credits"
                    periods={this.state.periods}
                    selected_period={this.state.selected_period}
                    currencies={this.state.currencies}
                    selected_currency={this.state.selected_currency}
                    bank_type={this.state.selected_bank_type}
                    bank_list={this.state.selected_bank_list}
                    all_banks_in_given_type={banks[this.state.selected_bank_type]}
                    incremental_inputs_anapara_data={this.state.anapara_buyume_orani}
                    incremental_inputs_ortalama_vade_data={this.state.ortalama_vade}
                    kur_data={this.state.kur}
                    faiz_data={this.state.faiz}
                    loading={false}
                    handleBankTypeChange={this.handleBankTypeChange}    
                    handleBankNameChange={this.handleBankNameChange}
                    handlePeriodChange={this.handlePeriodChange}
                    handleCurrencyChange={this.handleCurrencyChange}
                    draggable_data_changed={this.draggable_data_changed}
                    incremental_input_value_changed={this.incremental_input_value_changed}
                    handleCalculate={this.handleCalculate}
                />
            </Grid.Column>
        </div>

    }
}
export default CredistPage;