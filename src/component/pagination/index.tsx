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
  const startNumber = currentPage - 2 < 1 ? 2 : currentPage - 2;
  const length =
    totalPages - currentPage > 5 ? 5 : totalPages - currentPage + 2;

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
      {currentPage - 2 > 1 && totalPages >5&& <p> ... </p>}
      {numbers.map((number) => (
        <Link href={createPageURL(number)}>
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
      {totalPages - currentPage > 5 && <p> ... </p>}
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
