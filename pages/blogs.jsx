import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Blogs.module.css";
import * as fs from "fs";
import { platform } from "os";
import InfiniteScroll from "react-infinite-scroll-component";

const Blogs = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [count, setCount] = useState(5);
  const [loadmore, setLoadMore] = useState(true);
  // NOTE:  // if we use useEffect the contents will be fetched in the client side just like how we were doing in react
  //which is bad for seo as the bot won't get to see html element as it is (pre rendering)
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/blogs")
  //     .then((res) => res.json())
  //     .then((data) => setAllPosts(data));
  // }, []);
  // console.log(props); // we can see that this console.log is not there on console but on terminal

  const fetchData = async () => {
    if (loadmore === false) {
      return;
    }
    setCount((prev) => prev + 5);
    const res = await fetch(
      `https://huntingcoder-nandanvasistabh29.vercel.app/api/blogs?max=${count}`
    );
    const data = await res.json();
    if (data.join() == allPosts.join()) {
      setLoadMore(false);
    }
    setAllPosts(data);
  };

  return (
    <main className={`${styles.main} ${styles.grid}`}>
      <div className={styles.blog}>
        <h2>Popular Blogs</h2>
        <InfiniteScroll
          dataLength={allPosts.length} //This is important field to render the next data
          next={fetchData}
          hasMore={loadmore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center", color: "orange" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {allPosts.map((post, idx) => {
            return (
              <div key={idx}>
                {console.log(post.slug)}
                <Link href={`/blogpost/${post.slug}`}>
                  <div className={styles.blogItems}>
                    <h3>
                      {idx} {post.title} {new Date().getFullYear()}
                    </h3>
                    <p>{post.content.substr(0, 100)} ...</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </main>
  );
};

// this function will be ran in the server side
// thats the api call will be made directy from the server not by the client
// the client gets already painted doc
// export async function getServerSideProps(context) {
//   const res = await fetch("http://localhost:3000/api/blogs");
//   const allPosts = await res.json();
//   return {
//     props: { allPosts },
//   };
// } SSR

// SSG
export async function getStaticProps(context) {
  const directory = await fs.promises.readdir("blogData");
  if (directory[0] === ".DS_Store" && platform() === "darwin")
    directory.shift();
  const allPosts = [];
  let length = directory.length;
  if (length > directory.length) length = directory.length;
  // console.log(length);
  for (let i = 0; i < length; i++) {
    const currFile = await fs.promises.readFile(
      `blogData/${directory[i]}`,
      "utf-8"
    );
    allPosts.push(JSON.parse(currFile));
  }
  return {
    props: { allPosts },
  };
}
export default Blogs;
