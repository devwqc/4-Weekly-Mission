import styles from './Card.module.css';
import cardImg from '@/public/images/card_default.png';
import { formatDate, formatRelativeDate } from '@/src/utils/date';
import { IconKebabMenu, IconStar } from '@/src/components/Icon';
import { MouseEvent, SyntheticEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CardItem } from '@/src/types/card';

interface CardProps {
  item: CardItem;
}

function Card({ item }: CardProps) {
  const { title, description, url, createdAt, imageSource } = item;

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = cardImg.src;
  };

  /**
   *
   * @todo 북마크 눌렀을 때 동작 추가
   */
  const handleBookmarkClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   *
   * @todo 메뉴 눌렀을 때 동작 추가
   */
  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link
      href={url}
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.card__inner}>
        <div className={styles.card__image__container}>
          <Image
            className={styles.card__image}
            src={imageSource || ''}
            alt={title}
            onError={handleImgError}
          />
          <button
            type="button"
            className={styles.card__bookmark}
            onClick={handleBookmarkClick}
          >
            <IconStar />
          </button>
        </div>
        <div className={styles.card__info}>
          <div className={styles.info}>
            <header className={styles.info__header}>
              <div className={styles.info__time}>
                {formatRelativeDate(new Date(createdAt))}
              </div>
              <button
                type="button"
                className={styles.info__menu}
                onClick={handleMenuClick}
              >
                <IconKebabMenu />
              </button>
            </header>
            <div className={styles.info__content}>
              <div className={styles.info__description}>{description}</div>
            </div>
            <footer className={styles.info__footer}>
              {formatDate(new Date(createdAt))}
            </footer>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
