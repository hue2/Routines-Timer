import * as React from 'react'; 

export default function Input({...props}) {
    return (
        <>
            <input type="number" 
                min="1" 
                maxLength={3}  
                {...props}
            />
        </>
    );
}