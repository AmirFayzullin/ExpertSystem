import React, {useState} from 'react'

export const useForceUpadte = () => {
    const [state, setState] = useState(0);

    return () => setState(s => s + 1);
};