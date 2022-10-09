import styles from "../styles/Contact.module.css";
import { useState } from "react";
const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [desc, setdesc] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { phone, name, email, desc };
    setphone("");
    setname("");
    setdesc("");
    setemail("");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "http://localhost:3000/api/postcontact",
      requestOptions
    );
    alert("Thanks for contacting us");
    console.log("hi");
  };
  const handleChange = (e) => {
    if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "desc") {
      setdesc(e.target.value);
    } else if (e.target.name == "name") {
      setname(e.target.value);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formlabel}>
            Enter your name
          </label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={handleChange}
            required
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formlabel}>
            Email address
          </label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={handleChange}
            name="email"
            required
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className={styles.formtext}></div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>
            Phone
          </label>
          <input
            className={styles.input}
            type="phone"
            maxLength="10"
            minLength="10"
            required
            value={phone}
            onChange={handleChange}
            name="phone"
            id="phone"
          />
        </div>
        <div className={styles.mb3}>
          <label className={styles.formlabel} htmlFor="desc">
            Elaborate your concern
          </label>
          <textarea
            className={styles.input}
            value={desc}
            onChange={handleChange}
            required
            name="desc"
            id="desc"
          />
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Contact;
