import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    query: '',
  };

  onSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <Layout>
        <Searchbar onSubmit={this.onSubmit} />
        <ToastContainer autoClose={3000} />
        <ImageGallery formQuery={this.state.query} />
      </Layout>
    );
  }
}
