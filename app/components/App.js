import '../styles/application.scss';
import {connect} from '../services';
import React, {PureComponent} from 'react';

// The below line is here as an example of getting prices
connect('AAPL');

class App extends PureComponent {
    render() {
        return (
            <div className="stock-ticker">
                <h1>Stock Blotter</h1>


            </div>
        );
    }
}

export default App;
