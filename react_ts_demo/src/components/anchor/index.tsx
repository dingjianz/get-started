import {
  FC,
  memo,
  ReactNode,
  MouseEventHandler,
  createContext,
  useReducer,
  useContext,
  useMemo,
  useEffect,
} from 'react';

import styles from './index.module.scss';

interface IProps {
  children: ReactNode;
  affix?: boolean;
}

export interface LProps {
  href: string;
  title: string;
  children?: ReactNode;
}

interface IContextProps {
  state: {
    hash: string;
  };
  dispatchHash: ({ type, hash }: { type: string; hash: string }) => void;
}

const initState = {
  hash: '',
};

const MyContext = createContext({ state: initState } as IContextProps);

const reducer = (
  state: { hash: string },
  action: { type: string; hash: string },
) => {
  switch (action.type) {
    case 'setHash':
      return {
        ...state,
        hash: action.hash,
      };
    default:
      return state;
  }
};

const Anchor: FC<IProps> = memo(({ children, affix = true }) => {
  const [state, dispatchHash] = useReducer(reducer, initState);

  useEffect(() => {
    const hash = window.location.hash;
    dispatchHash({
      type: 'setHash',
      hash,
    });
    if (hash) {
      const $dom = document.querySelector(hash);
      $dom?.scrollIntoView();
    }

    window.addEventListener('scroll', () => {
      console.log(document.documentElement.scrollTop);
    });

    return () => {
      window.removeEventListener('scroll', () => {
        console.log(111);
      });
    };
  }, []);

  return (
    <div
      className={[
        styles.anchor_wrapper,
        affix ? styles.anchor_wrapper_sticky : '',
      ].join(' ')}
    >
      <div className={styles.anchor}>
        <MyContext.Provider
          value={useMemo(
            () => ({
              state,
              dispatchHash,
            }),
            [state],
          )}
        >
          {children}
        </MyContext.Provider>
      </div>
    </div>
  );
});

const Link: FC<LProps> = ({ href, title, children = [] }) => {
  const { state, dispatchHash } = useContext(MyContext);

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
    dispatchHash({
      type: 'setHash',
      hash: href,
    });
  };

  return (
    <div className={styles.anchor_link}>
      <a
        className={[
          styles.anchor_link_title,
          state?.hash === href ? styles.anchor_link_title_active : '',
        ].join(' ')}
        href={href}
        onClick={handleClick}
      >
        {title}
      </a>
      {children}
    </div>
  );
};

export { Anchor, Link };
