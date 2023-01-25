import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  const [query, setQuery] = useState('');

  const onSubmit = query => {
    setQuery(query);
  };

  return (
    <Layout>
      <Searchbar onSubmit={onSubmit} />
      <ToastContainer autoClose={3000} />
      <ImageGallery formQuery={query} />
    </Layout>
  );
};
