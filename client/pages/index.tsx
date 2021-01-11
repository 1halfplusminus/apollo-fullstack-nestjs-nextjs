import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Bar from "../components/bar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Bar />
      <Footer />
    </div>
  );
}
