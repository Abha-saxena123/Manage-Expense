import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

interface HomePageProps {
  message?: string;
}

const RedirectPage: React.FC<HomePageProps> = ({ message }) => {
  return (
    <div style={{ margin: "100px" }}>
      <h1>{message}</h1>
      <Link href={"/"}>Click here to add new entry</Link>
    </div>
  );
};

export default RedirectPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { message },
  } = context;
  return { props: { message: message || "" } };
}
