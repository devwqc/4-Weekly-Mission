import styles from './Header.module.css';
import { Button } from '@/src/components/Button';
import { IconLogo } from '@/src/components/Icon';
import { useLoginUser, useSetLoginUser } from '@/src/contexts/LoginContext';
import { User } from '@/src/types/user.type';
import Link from 'next/link';
import Image from 'next/image';
import { getUser } from '@/src/apis/api';

function Header() {
  const loginUser = useLoginUser();
  const setLoginUser = useSetLoginUser();

  /**
   * @todo locaion에서 주소 받아서 /folder일 경우 style 적용
   */
  const handleLoginClick = async () => {
    try {
      const { data } = await getUser(4);
      if (!data) return;
      const user = data[0];
      setLoginUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__logo}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logo__link}>
              <IconLogo />
            </Link>
          </div>
        </div>
        <div className={styles.header__auth}>
          {loginUser ? (
            <ButtonUser user={loginUser} />
          ) : (
            <ButtonLogin onClick={handleLoginClick} />
          )}
        </div>
      </div>
    </header>
  );
}

interface ButtonLoginProps {
  onClick: () => void;
}

/**
 * @todo 컴포넌트 분리
 */
function ButtonLogin({ onClick }: ButtonLoginProps) {
  return (
    <Button type="button" onClick={onClick} fontSize={18}>
      로그인
    </Button>
  );
}

interface ButtonUserProps {
  user: User;
}

/**
 * @todo 컴포넌트 분리
 */
function ButtonUser({ user }: ButtonUserProps) {
  return (
    <button type="button" className={styles['button-user']}>
      <div className={styles['button-user__img__container']}>
        <Image
          className={styles['button-user__img']}
          src={user.image_source}
          alt={user.name}
          fill={true}
        />
      </div>
      <div className={styles['button-user__email']}>{user.email}</div>
    </button>
  );
}

export default Header;
