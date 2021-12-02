import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

import s from './ImageGallery.module.css';

export default function ImageGallery({ items }) {
  const [imgIndex, setImgIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleClick(index) {
    setImgIndex(index);
    setShowModal(true);
  }

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <ul className={s.gallery}>
        {items.map((item, index) => (
          <ImageGalleryItem
            key={index}
            item={item}
            onClick={() => {
              handleClick(index);
            }}
          />
        ))}
      </ul>
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <img src={items[imgIndex].largeImageURL} alt={items[imgIndex].tags} />
        </Modal>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
