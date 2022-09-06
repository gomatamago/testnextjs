import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layouts';
import utilStyle from '../styles/utiles.module.css';
import { getPostsData } from '../lib/post';

// SSGの場合はgetStaticPropsを使う
export async function getStaticProps() {
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData,
    }
  }
}

export default function Home({allPostsData}) {
  return <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyle.headingMd}>
      <p>ブログです</p>
    </section>
    <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
      <h2>✍エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id, title, date, thumbnail}) => (
        <article key={id}>
          <Link href={`/posts/${id}`}>
            <img 
            src={`${thumbnail}`} className={styles.thumbnailImage} />
          </Link>
          <Link href={`/posts/${id}`}>
            <a className={utilStyle.boldText}>{title}</a>
          </Link>
          <br />
          <small className={utilStyle.lightText}>
            {date}
          </small>
        </article>
        ))}
      </div>
    </section>
  </Layout>
}
