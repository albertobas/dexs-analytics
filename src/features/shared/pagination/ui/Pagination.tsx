import { Dispatch, memo, SetStateAction } from 'react';
import styles from 'src/features/shared/pagination/styles/pagination.module.css';

type Props = {
  dataLength: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const Pagination = ({ dataLength, currentPage, itemsPerPage, setCurrentPage }: Props) => {
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  if (totalPages === 0) {
    return null;
  }
  const shownPagesNum = 3;
  const isNotFirst = currentPage > 0;
  const isNotLast = currentPage < totalPages - 1;
  const offset = Math.floor(shownPagesNum / 2);
  let start = Math.max(currentPage - offset, 0);
  const end = Math.min(start + shownPagesNum, totalPages);
  if (totalPages >= shownPagesNum && end >= totalPages) {
    start = totalPages - shownPagesNum;
  }
  const handlePrev = (e: React.MouseEvent) => {
    isNotFirst && setCurrentPage(currentPage - 1);
  };
  const handleNext = (e: React.MouseEvent) => {
    isNotLast && setCurrentPage(currentPage + 1);
  };
  const handlePage = (e: React.MouseEvent, i: number) => {
    const isCurrent = currentPage === i;
    !isCurrent && setCurrentPage(i);
  };
  const pages = [];
  for (let i = start; i < end; i++) {
    pages.push(
      <li key={i}>
        <button
          aria-label={'Page' + i.toString()}
          className={`${currentPage === i ? styles.selected : styles.interactive} ${styles.numbers} ${
            styles.borderBetween
          }`}
          onClick={(e) => handlePage(e, i)}
        >
          <span>{i + 1}</span>
        </button>
      </li>
    );
  }
  return (
    <ul className={styles.layout}>
      <li key="prev">
        <button
          aria-label="Previous page"
          className={`${!isNotFirst ? styles.disabled : styles.interactive} ${styles.icons} ${styles.borderBetween}`}
          onClick={handlePrev}
        >
          <span>←</span>
        </button>
      </li>
      {[...pages]}
      <li key="next">
        <button
          aria-label="Next page"
          className={`${!isNotLast ? styles.disabled : styles.interactive} ${styles.icons} ${styles.borderBetween}`}
          onClick={handleNext}
        >
          <span>→</span>
        </button>
      </li>
    </ul>
  );
};

export default memo(Pagination);
