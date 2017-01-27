import React, {Component} from 'react';
import Geosuggest from 'react-geosuggest';
import '../../styles/GoogleMapSearch/geosuggest.css';
class GoogleMapSearch extends Component {
    
    constructor (props) {
        super(props);

        this.state = {term: ''};
    }
    
    // componentWillReceiveProps(nextProps) {
    //     this.setState({term: nextProps.value}); // update state when props change
    // }

    //   When the user select the option, onSuggestSelect will pass an object, in side the object there is label, which is the Name of the location.
    // We pass this lable in the updateVale function, 
    updateValue(value){
        console.log('value: ', value)
        // Call the onChange function from redux-form 
        // It will notify redux-form that the value was changed
        // this.props.onChange(value);
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
                    onSuggestSelect={(suggest)=>{this.updateValue(suggest.label);}}
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