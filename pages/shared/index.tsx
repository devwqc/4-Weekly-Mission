import styles from './shared.module.css';
import { CardItem } from '@/src/types/card';
import { ReactElement, useEffect, useState } from 'react';
import { getFolder } from '@/src/apis/api';
import { SearchBox } from '@/src/components/SearchBox';
import { CardList } from '@/src/components/CardList';
import Image from 'next/image';
import { MainLayout } from '@/src/components/Layout';

interface FolderInfo {
  id: number;
  name: string;
}

interface Owner {
  id: number;
  name: string;
  profileImageSource: string;
}

export default function SharedPage() {
  const [folderInfo, setFolderInfo] = useState<FolderInfo | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [items, setItems] = useState<CardItem[]>([]);

  const handleLoad = async () => {
    try {
      const { folder } = await getFolder();
      const { id, name, owner, links } = folder;
      setFolderInfo({ id, name });
      setOwner(owner);
      setItems(links);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  if (!folderInfo || !owner) {
    return null;
  }

  return (
    <div className={styles.shared}>
      <SharedHeader folderInfo={folderInfo} owner={owner} />
      <SharedContent items={items} />
    </div>
  );
}

interface SharedHeaderProps {
  folderInfo: FolderInfo;
  owner: Owner;
}

function SharedHeader({ folderInfo, owner }: SharedHeaderProps) {
  return (
    <header className={styles['shared-header']}>
      <div className={styles.profile}>
        <div className={styles.profile__image__container}>
          <Image
            className={styles.profile__image}
            src={owner.profileImageSource}
            alt={owner.name}
            fill={true}
          />
        </div>
        <div className={styles.profile__title}>@{owner.name}</div>
      </div>
      <div className={styles['shared-header__title']}>{folderInfo.name}</div>
    </header>
  );
}

interface SharedContentProps {
  items: CardItem[];
}

function SharedContent({ items = [] }: SharedContentProps) {
  return (
    <div className={styles['shared-content']}>
      <header className={styles['shared-content__header']}>
        <SearchBox type="text" placeholder="링크를 검색해 보세요." />
      </header>
      <CardList items={items} />
    </div>
  );
}

SharedPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
