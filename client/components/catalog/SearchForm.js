import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './_SearchForm.scss';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                select: '',
                query: ''
            }
        };

        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) { 
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    submit(e) {
        e.preventDefault();

        this.props.search(this.state.data);

        this.setState({
            data: {
                ...this.state.data,
                query: ''
            }
        })
    }

    render() {
        return (
            <div className="sass-SearchForm">
                <form onSubmit={this.submit}>
                    <div className="form-group row">
                        <div className="col-sm-4">
                            <select className="form-control" name="select" onChange={this.onChange}>
                                <option value="" hidden selected>Wybierz opcję...</option>
                                <option value="title">Tytuł</option>
                                <option value="author">Autor</option>
                            </select>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="query" name="query" onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="submit" className="btn">Szukaj</button>
                        {fetch.errors && <p className="error">{fetch.errors.global}</p>}
                    </div>
                </form>
            </div>
        );
    }
}

SearchForm.propTypes = {
    search: PropTypes.func.isRequired
}

export default SearchForm;