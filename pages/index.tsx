import type { GetStaticProps } from "next";

import styles from "../styles/Home.module.css";

interface HomePageProps {
  status?: string;
}

const Home: React.FC<HomePageProps> = ({ status }) => {
  return (
    <div className={styles.div} id="add-entry">
      <h1>Add Entry</h1>
      <form className={styles.form} action="/api/handle-form" method="post">
        <label className={styles.label}>
          <select id="myList" className={styles.dropdown} name={"Type"}>
            <option> ---Choose type--- </option>
            <option value={"Credit"}> Credit </option>
            <option value={"Debit"}> Debit </option>
          </select>
          <select id="myCategory" className={styles.dropdown} name={"Category"}>
            <option> ---Choose Category--- </option>
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
          <div> Reamrks:</div>
          <input type="text" name="Remarks" />
        </label>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
      {status && (
        <p>
          {status === "success"
            ? "Entry has been added successfully"
            : "Oops, somthing went wrong. Please try again"}
        </p>
      )}
    </div>
  );
};

export default Home;
export const getStaticProps: GetStaticProps = async (context) => {
  const status = context.params?.status || "";

  return { props: { status } };
};
