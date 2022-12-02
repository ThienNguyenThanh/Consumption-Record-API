import {Form} from 'semantic-ui-react'
import React, {useState} from 'react'

export const TextField = ({
    onSave,
    icon,
    value,
    loading,
    error,
    ...props
  }) => {
    const [saving, setSaving] = useState(false);
    const [lastValue, setLastValue] = useState(value || "");
  
    // 1. We introduce some new state to keep track of
    const [saved, setSaved] = useState(false);
    const [saveError, setSaveError] = useState();
    return (
      <React.Fragment>
        <Form.Input
          icon={{
            // 2. we swap our icon depending on the save state
            name: saveError
              ? "warning circle"
              : saved
              ? "check circle"
              : icon,
            // 3. let's change the icon color as well for better feedback
            color: saveError ? "red" : saved ? "green" : "grey"
          }}
          value={value}
          loading={loading || saving}
          disabled={loading || saving}
          // 4. we will either show a validation error or a save error
          error={error || saveError}
          // 5. we probably don't wantt to show a saved icon when input changes
          onChange={() => {
            setSaved(false);
          }}
          onBlur={async e => {
            const val = e.target.value;
            // console.log(val)
            // console.log(lastValue)
            
            if(!isNaN(val) && !isNaN(val - 0)){
              if (val !== lastValue) {
                setSaving(true);
                try {
                  onSave && (await onSave(val));
                  setSaved(true);
                  setSaving(false);
                  setLastValue(val);
                  setSaveError(null);
                } catch (err) {
                  // 6. let's save the error so we can let the user know a save failed
                  setSaveError("Something wrongs while saving new input!");
                }
              }else{
                setSaved(true);
                setSaveError(null);
              }
            }else{
              setSaveError("Input should be a number!");
            }
            
          }}
          {...props}
        />
        <h1>{lastValue}</h1>
      </React.Fragment>
    );
  };