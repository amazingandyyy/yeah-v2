import React, {Component} from 'react';
import Geosuggest from 'react-geosuggest';
import '../../styles/GoogleMapSearch/geosuggest.css';
class GoogleMapSearch extends Component {
    
    constructor (props) {
        super(props);

        this.state = {term: '', init: ''};
    }

    //   When the user select the option, onSuggestSelect will pass an object, in side the object there is label, which is the Name of the location.
    // We pass this lable in the updateVale function, 
    // componentWillReceiveProps(nextProps){
    //     this.setState({term: nextProps.value});
    // }

    componentWillMount(){
         this.setState({init:this.props.input.value});
    }
    
    updateValue(value){
        // console.log('value update: ', value)
        // Call the onChange function from redux-form 
        // It will notify redux-form that the value was changed
        this.props.input.onChange(value);
        this.setState({term: value})
    }
    
    render() {
        // Redux-Form pass in two props: Input and Meta, We will use the input.value and input.onChange
        // const { onChange, className } = this.props;
        return (
            <span style={{width: '100%'}}>
                 <Geosuggest
                    inputClassName='yeah-input'
                    {...this.props}
                    placeholder="Enter Activity Location" 
                    onSuggestSelect={(suggest)=>{this.updateValue(suggest);}}
                    initialValue={this.state.init}
                />            
            </span>
            
        );
    }
    
}

export default GoogleMapSearch;

// <Geosuggest inputClassName='form-control' placeholder="Enter Activity Location" onSuggestSelect={(suggest)=>{
//                     this.setState({term: suggest.label});}} onChange={(v)=>{console.log('changedvalue:',v)}} value={this.state.term} />
//  <input value={value} onChange={(e)=>{this.updateValue(e.target.value)}} />    

// <span style={{width: '100%'}}>
//     <Geosuggest
//     inputClassName={className}
//     placeholder="Enter Activity Location" 
//     onSuggestSelect={(suggest)=>{this.updateValue(suggest.label);}} 
//     onChange={this.updateValue.bind(this)}
//     value={this.state.term}
// />            
// </span>