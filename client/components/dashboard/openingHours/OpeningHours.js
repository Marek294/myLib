import React, { Component } from 'react';

import './_OpeningHours.scss';
import '../_DashboardCard.scss';

class OpeningHours extends Component {
    render() {
        return (
            <div className="sass-OpeningHours DashboardCard">
                <div>
                    <div className="header">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        <h4>Godziny otwarcia</h4>
                    </div>
                    <div className="body">
                        <div className="day">
                            <p className="primary">Poniedziałek</p>
                            <p className="secondary">10:00 - 14:00</p>
                        </div>
                        <div className="day">
                            <p className="primary">Wtorek</p>
                            <p className="secondary">10:00 - 14:00</p>
                        </div>
                        <div className="day">
                            <p className="primary">Środa</p>
                            <p className="secondary">13:00 - 17:00</p>
                        </div>
                        <div className="day">
                            <p className="primary">Czwartek</p>
                            <p className="secondary">10:00 - 14:00</p>
                        </div>
                        <div className="day">
                            <p className="primary">Piątek</p>
                            <p className="secondary">13:00 - 17:00</p>
                        </div>
                        <div className="day">
                            <p className="primary">Sobota</p>
                            <p className="secondary">Zamknięte</p>
                        </div>
                        <div className="day">
                            <p className="primary">Niedziela</p>
                            <p className="secondary">Zamknięte</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OpeningHours;