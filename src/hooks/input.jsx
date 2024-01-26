import { useState } from 'react';

const useInput = (defaultValue = '') => {
	const [value, setValue] = useState(defaultValue);

	const setInput = (e) => {
		setValue(e.target.value);
	};

	const resetInput = () => {
		setValue('');
	};

	return [value, setInput, resetInput];
};

export default useInput;
