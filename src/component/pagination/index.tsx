import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import arrow from "./../../../public/images/icon/darkArrow.png";
import styles from "./pagination.module.scss";
import Image from "next/image";

export type PaginationProps = {
  totalPages: number;
  setIsLoading: Function;
};

export default function Pagination({
  totalPages,
  setIsLoading,
}: PaginationProps) {
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
          <div onClick={() => setIsLoading(true)}>
            <Image src={arrow} alt="prev" className={styles.prev} />
          </div>
        </Link>
      )}
      <Link href={createPageURL(1)}>
        <div
          className={` ${styles.pageNumber} ${
            1 === currentPage ? styles.active : ""
          }`}
          onClick={() => setIsLoading(true)}
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
            onClick={() => setIsLoading(true)}
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
            onClick={() => setIsLoading(true)}
          >
            <p>{totalPages}</p>
          </div>
        </Link>
      )}
      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)}>
          <div onClick={() => setIsLoading(true)}>
            <Image src={arrow} alt="next" />
          </div>
        </Link>
      )}
    </div>
  );
}
