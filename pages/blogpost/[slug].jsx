import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import * as fs from "fs";
import styles from "../../styles/BlogPost.module.css";
const Slug = (props) => {
  const [post, setPost] = useState(props.post);

  // get this slug n then query the DB and if u find the blog post show it else send a 404
  // 2 types of pre rendering -> SSR and SSG
  // SSR andre generate this HTML Page in the server and send it to the client . this html page has its content already populated
  // SSG alli you generate a webpage completely and place it on CDN if u want and send it (BEST) but the problem is if the content changes it won't be affected you need redeploy it

  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);

  //       if (data.error) {
  //         setErr(true);
  //       } else {
  //         setPost(data);
  //         setErr(false);
  //       }
  //     });
  // }, [slug]);
  return (
    <>
      <>
        <style jsx>{`
          .heading {
            color: whitesmoke;
          }
          p {
            font-size: 24px;
            letter-spacing: 2px;
            font-weight: normal;
          }
        `}</style>
        <h1 className="heading">
          <div className={styles.container}>
            <main className={styles.main}>
              <h1>
                {post.title} in {new Date().getFullYear()}
              </h1>
              <hr />
              <p>{post.content}</p>
            </main>
          </div>
        </h1>
      </>
    </>
  );
};
// this is for SSR
// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   const res = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
//   const post = await res.json();
//   return {
//     props: { post },
//   };
// }
// for SSG we can't use an API call to get the data
// we need to somewhat define API's itself here in getStaticProps
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "how-to-learn-java" } },
      { params: { slug: "how-to-learn-javascript" } },
      { params: { slug: "how-to-learn-nextjs" } },
      { params: { slug: "how-to-learn-python" } },
      { params: { slug: "how-to-learn-reactjs" } },
    ],
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { slug } = context.params;
  const file = await fs.promises.readFile(`blogData/${slug}.json`, "utf-8");
  const post = JSON.parse(file);
  return {
    props: { post },
  };
}
export default Slug;
