import { SearchBox, SearchBoxLink } from '@/src/components/SearchBox';
import * as S from '../../styles/Folder.styled';
import { getFolders, getLinks } from '@/src/apis/api';
import { useLoginUser } from '@/src/contexts/LoginContext';
import { Link } from '@/src/types/card';
import { UserFolder } from '@/src/types/folder';
import { ReactElement, useEffect, useState } from 'react';
import { TabList } from '@/src/components/TabList';
import {
  IconAdd,
  IconDustbin,
  IconPen,
  IconShare,
} from '@/src/components/Icon';
import { CardList } from '@/src/components/CardList';
import { MainLayout } from '@/src/components/Layout';

export default function FolderPage() {
  const loginUser = useLoginUser();
  const [activeFolder, setActiveFolder] = useState<UserFolder | null>(null);
  const [folders, setFolders] = useState<UserFolder[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  const handleLoadFolders = async () => {
    const userId = loginUser?.id;
    if (!userId) return;
    try {
      const { data } = await getFolders(userId);
      setFolders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectFolder = (folder: UserFolder | null) => {
    setActiveFolder(folder);
  };

  const handleLoadLinks = async () => {
    const userId = loginUser?.id;
    const folderId = activeFolder?.id || null;
    if (!userId) return;
    try {
      const data = await getLinks(userId, folderId);
      setLinks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLoadFolders();
    handleLoadLinks();
  }, [loginUser, activeFolder]);

  return (
    <S.FolderPageLayout>
      <S.FolderPageHeader>
        <S.HeaderSearch>
          <SearchBoxLink placeholder="링크를 추가해 보세요" />
        </S.HeaderSearch>
      </S.FolderPageHeader>
      <S.FolderPageContent>
        <S.ContentHeader>
          <SearchBox placeholder="링크를 검색해 보세요." />
          {loginUser ? (
            <>
              <S.ContentTabBox>
                <TabList
                  items={folders}
                  activeId={activeFolder?.id || null}
                  onSelect={handleSelectFolder}
                />
                <S.ContentTabAdd>
                  폴더 추가 <IconAdd />
                </S.ContentTabAdd>
              </S.ContentTabBox>
              <S.ContentTitleBox>
                <S.ContentTitle>{activeFolder?.name || '전체'}</S.ContentTitle>
                {activeFolder?.name && (
                  <S.ContentOptionBox>
                    <S.ContentOptionItem>
                      <IconShare />
                      공유
                    </S.ContentOptionItem>
                    <S.ContentOptionItem>
                      <IconPen />
                      이름 변경
                    </S.ContentOptionItem>
                    <S.ContentOptionItem>
                      <IconDustbin />
                      삭제
                    </S.ContentOptionItem>
                  </S.ContentOptionBox>
                )}
              </S.ContentTitleBox>
            </>
          ) : (
            <S.ContentEmptyBox>저장된 링크가 없습니다.</S.ContentEmptyBox>
          )}
        </S.ContentHeader>
        {loginUser &&
          (links.length ? (
            <CardList items={links} />
          ) : (
            <S.ContentEmptyBox>저장된 링크가 없습니다.</S.ContentEmptyBox>
          ))}
      </S.FolderPageContent>
    </S.FolderPageLayout>
  );
}

FolderPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
