import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    const { country, category, apiKey, pageSize } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ articles: data.articles, totalResults: data.totalResults, loading: false });
  };

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, this.fetchArticles);
  };

  handleNextClick = async () => {
    const { page, totalResults } = this.state;
    const { pageSize } = this.props;
    if (page + 1 <= Math.ceil(totalResults / pageSize)) {
      this.setState({ page: page + 1 }, this.fetchArticles);
    }
  };

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{ margin: '40px 0px' }}>
          NewsBanana - TOP {this.props.category} HEADLINES 
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
