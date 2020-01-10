//https://stackoverflow.com/questions/42640636/react-must-be-in-scope-when-using-jsx-react-react-in-jsx-scope
import React from "react";
import { Field } from "redux-form";
 
 // https://codeburst.io/forms-with-redux-form-v7-part-2-of-2-f44ffee4a34d
 export default  (props) => {
    // console.log(props);
    const renderRadioButtons = (key, index) => {
      // console.log(key, index)
      return (
        <div className="field" key={`${index}`}>
          <div>
            <label htmlFor={key}>
              <Field
                id={key}
                component="input"
                name={props.input.name}
                type="radio"
                value={key}
                className='radio-input'
              />

              {props.options[key]}
            </label>
          </div>
        </div>
      );
    };

    return (
      <div className="inline fields">
        <label>{props.label}</label>

        {props.options && Object.keys(props.options).map(renderRadioButtons)}
      </div>
    );
  };