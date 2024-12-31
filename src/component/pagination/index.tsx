import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { PaginationProps } from "./pagination.type";

import styles from "./pagination.module.scss";

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const length = totalPages <= 7 ? totalPages - 2 : 5;
  const startNumber =
    totalPages <= 7
      ? 2
      : totalPages - 2 <= currentPage
      ? totalPages - 5
      : currentPage - 2 > 2
      ? currentPage - 2
      : 2;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const numbers = Array.from({ length: length }, (_, i) => startNumber + i);

  return (
    <div className={styles.paginationWrapper}>
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      )}
      <Link href={createPageURL(1)}>
        <div
          className={` ${styles.pageNumber} ${
            1 === currentPage ? styles.active : ""
          }`}
        >
          <p> 1 </p>
        </div>
      </Link>
      {currentPage - 3 > 1 && <p> ... </p>}
      {numbers.map((number) => (
        <Link href={createPageURL(number)} key={number}>
          <div
            className={` ${styles.pageNumber} ${
              number === currentPage ? styles.active : ""
            }`}
            key={number}
          >
            <p>{number}</p>
          </div>
        </Link>
      ))}
      {currentPage + 3 < totalPages && <p> ... </p>}
      {totalPages !== 1 && (
        <Link href={createPageURL(totalPages)}>
          <div
            className={` ${styles.pageNumber} ${
              totalPages === currentPage ? styles.active : ""
            }`}
          >
            <p>{totalPages}</p>
          </div>
        </Link>
      )}
      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      )}
    </div>
  );
}
