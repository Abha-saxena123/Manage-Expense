import { resetGlobalState } from "mobx/dist/internal";
import type { GetStaticProps } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

interface HomePageProps {
  status?: string;
}

const Home: React.FC<HomePageProps> = ({ status }) => {
  const [message, setMessage] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const inputs: any = {};
    ["Type", "Category", "Date", "Amount", "Remarks"].forEach(
      (item: string) => {
        //@ts-ignore
        const value = event.target.elements?.[item]?.value;
        if (value !== "") {
          //@ts-ignore
          inputs[item] = value;
        }
      }
    );

    const response = await fetch("/api/handle-form", {
      method: "POST",
      body: JSON.stringify(inputs),
    });

    const form = document.getElementById("myForm") as HTMLElement;

    form.reset();

    response.status === 200
      ? setMessage("Entry has been added successfully")
      : setMessage("Oops, somthing went wrong. Please try again");
  };

  return (
    <div className={styles.div} id="add-entry">
      <h1>Add Entry</h1>
      <form className={styles.form} onSubmit={handleSubmit} id="myForm">
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
          <div> Remarks:</div>
          <input type="text" name="Remarks" />
        </label>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Home;
