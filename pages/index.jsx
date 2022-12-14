import Head from "next/head"; // Head koduthe which u couldn't access without using vanialla JS in react -> this helps in seo a LOT
// you can't have Image in SSG
// import Image from "next/image"; //  // adds the compression feature // loads
import Link from "next/link";
import * as fs from "fs";
import { platform } from "os";
import Script from "next/script";
import { useEffect, useState } from "react";
// all these above 3 components are profided by nextJs building on top of the raw Html elements

import styles from "../styles/Home.module.css";

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/blogs?max=3")
  //     .then((res) => res.json())
  //     .then((data) => setPosts(data));
  // }, []); can't do this while doing SSG
  return (
    <div className={styles.container}>
      <Head>
        <title>Hunting Coder</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="keywords"
          content="Blog,Coding Blog,Hunter Blog,react,next,html,css,JavaScript"
        />
        <meta
          name="google-site-verification"
          content="GGiivunvm8VhDQtKeIWWUkyoKaWiMN1eXppdmc7D_qE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="/analytics.js" strategy="lazyOnload" />
      {/* this can be used to link analytics and other stuff strategy="lazyOnLoad" makes sures that this script is ran only when all other contents are loaded */}
      {/* can add google analytics script */}

      <main className={styles.main}>
        <h1 className={styles.title}>
          {" "}
          <span style={{ color: "orange" }}>&lt;</span> Hunting Coder
          <span style={{ color: "orange" }}> /&gt;</span>
        </h1>
        <p className={styles.description}>
          Blogs for coders from a hunting coder Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Fugit quo doloremque blanditiis,
          consequuntur quasi corrupti! Dolor vitae nihil incidunt iste ipsum! At
          iste ratione nobis.
        </p>
        <img
          src={"/huntercoder.jpeg"}
          width={700}
          height={400}
          style={{
            maxWidth: "100vw",
            borderRadius: "5%",
            border: "2px solid white",
            padding: "1vmin",
            margin: "1vmin",
          }}
          id="huntercoderimage"
          alt="hunter coder image"
        />
        <br />

        <div className={styles.blog}>
          {posts && (
            <>
              <h2>Popular Blogs</h2>
              {posts.map((post, idx) => {
                return (
                  <Link key={idx} href={`/blogpost/${post.slug}`}>
                    <div className={styles.blogItems}>
                      <h3>
                        {post.title} {new Date().getFullYear()}
                      </h3>
                      <p>{post.content.substr(0, 100)} ...</p>
                    </div>
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}>Powered by Nandan</footer>
    </div>
  );
}
export async function getStaticProps(context, max) {
  const directory = await fs.promises.readdir("blogData");
  if (directory[0] === ".DS_Store" && platform() === "darwin")
    directory.shift();
  const posts = [];
  let length = 3 || directory.length;
  if (length > directory.length) length = directory.length;
  // console.log(length);
  for (let i = 0; i < length; i++) {
    const currFile = await fs.promises.readFile(
      `blogData/${directory[i]}`,
      "utf-8"
    );
    posts.push(JSON.parse(currFile));
  }
  return {
    props: { posts },
  };
}
