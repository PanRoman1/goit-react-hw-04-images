import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

function smoothScroll() {
  const cardHeight = document
    .querySelector('ul')
    .firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export const ImageGallery = ({ formQuery }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [visibleBtn, setVisibleBtn] = useState(false);

  useEffect(() => {
    setPage(1);
    setImages([]);
    setQuery(formQuery);
  }, [formQuery]);

  useEffect(() => {
    async function fetchImages() {
      try {
        if (query === '') {
          return;
        }

        setIsLoading(true);
        setVisibleBtn(false);

        const imageList = await getImages(query, page);
        if (imageList.totalHits === 0) {
          toast.warn(`Фото на тематику "${query}" не знайдено`, {
            theme: 'colored',
          });
        }
        setImages(prevImages => [...prevImages, ...imageList.hits]);

        setIsLoading(false);
        setTotalHits(imageList.totalHits);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [page, query]);

  useEffect(() => {
    if (images.length !== 0 && !visibleBtn && images.length < totalHits) {
      setVisibleBtn(true);
    } else if (images.length >= totalHits && visibleBtn) {
      setVisibleBtn(false);
    }
  }, [images, totalHits, visibleBtn]);

  const onClickLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Gallery>
        {images.map(image => (
          <ImageGalleryItem image={image} key={image.id} />
        ))}
      </Gallery>
      {isLoading && <Loader />}
      {visibleBtn && <Button onClick={onClickLoadMoreBtn} />}
    </>
  );
};

ImageGallery.propTypes = {
  formQuery: PropTypes.string.isRequired,
};
