import { CardItem } from '@/src/types/card';
import Card from './Card';
import styles from './CardList.module.css';

interface CardListProps {
  items: CardItem[];
}

function CardList({ items }: CardListProps) {
  return (
    <div className={styles['card-list']}>
      {items?.map((item) => <Card key={item.id} item={item} />)}
    </div>
  );
}

export default CardList;
