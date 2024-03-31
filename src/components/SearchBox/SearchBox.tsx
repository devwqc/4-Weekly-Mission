import styles from './SearchBox.module.css';
import { IconSearch } from '../Icon';
import { InputProps } from '@/src/types/props';

interface SearchBoxProps extends InputProps {}

function SearchBox(props: SearchBoxProps) {
  return (
    <div className={styles['search-box']}>
      <IconSearch />
      <input className={styles['search-box__input']} {...props} />
    </div>
  );
}

export default SearchBox;
