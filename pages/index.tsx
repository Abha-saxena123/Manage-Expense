import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

interface HomePageProps {
  message?: string;
}

const Home: React.FC<HomePageProps> = () => {
  return (
    <div className={styles.div} id="add-entry">
      <h1>Add Entry</h1>
      <form
        className={styles.form}
        action={"/api/handle-form"}
        id="myForm"
        method="POST"
      >
        <label className={styles.label}>
          <select id="myList" className={styles.dropdown} name={"Type"}>
            <option> Type </option>
            <option value={"Credit"}> Credit </option>
            <option value={"Debit"}> Debit </option>
          </select>
          <select id="myCategory" className={styles.dropdown} name={"Category"}>
            <option> Category</option>
            <option value={"Food"}> Food </option>
            <option value={"Grocery"}> Grocery </option>
            <option value={"Furniture"}> Furniture </option>
            <option value={"Appliances"}> appliances </option>
            <option value={"Investment"}> Investment </option>
          </select>
        </label>
        <label className={styles.label}>
          <div>Date of expense:</div>
          <input type="date" name="Date" style={{ flexGrow: 1 }} />
        </label>

        <label className={styles.label}>
          <div>Amount:</div>
          <input type="text" name="Amount" />
        </label>
        <label className={styles.label}>
          <div> Remarks:</div>
          <input type="text" name="Remarks" />
        </label>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { message },
  } = context;
  return { props: { message: message || "" } };
}
