import React, { Component } from 'react';

import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import Loading from './Loading';

import './Search.css';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const searchQuery = event.target.value;

    this.setState({ searchQuery });

    if (!searchQuery) {
      return '';
    }

    this.setState({ loading: true });

    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then(result => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="Search">
        <span className="Search-icon" />
        <input
          className="Search-input"
          type="text"
          placeholder="Currency name"
          onChange={this.handleChange}
        />
        {loading && (
          <div className="Search-loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
      </div>
    );
  }
}
