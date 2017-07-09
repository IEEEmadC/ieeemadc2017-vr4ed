import Firestack from 'react-native-firestack';


const configurationOptions = {
  debug: true,
};


export const stack = new Firestack(configurationOptions);
stack.on('debug', msg => console.log('Received debug message', msg));
