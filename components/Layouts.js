import Head from "next/head";
import styles from "./layout.module.css";
import utilstyles from "../styles/utiles.module.css";
import Link from "next/link";

const name = "shin Code";
export const siteTitle = "Next.js blog";

function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"></link>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img src="/images/profile.png" className={`${utilstyles.borderCircle} ${styles.headerHomeImage}`} />
                        <h1 className={utilstyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <img src="/images/profile.png" className={utilstyles.borderCircle} />
                        <h1 className={utilstyles.heading2Xl}>{name}</h1>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div>
                    <Link href="/">ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;