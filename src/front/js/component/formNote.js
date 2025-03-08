import React, { useState, useEffect } from "react";



export const FormNote = () => {
  const [contact, setContact] = useState([""])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  
  console.log((contact));
  

  async function createContact() {
    if (name === "" || email === "" || phone === "" || address === "") {
      throw new Error("Contacto no creado. Complete todos los campos de manera correcta");
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "title": name,
        "description": email
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      try {
        let response = await fetch("https://playground.4geeks.com/contact/agendas/LMezza/contacts", requestOptions);
        if (response === !201) {
          alert("Contacto no creado")
        }
        let result = await response.json();
        setContact=(result)
        setName("")
        setEmail("")
      } catch (error) {
        console.error(error);
      };
    }
  }

  function save() {
    createContact()
  }

  useEffect(() => {
    createContact()
  }, [])

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label d-flex">Title</label>
          <input className="form-control" id="title" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label d-flex">Description</label>
          <textarea className="form-control" rows="3" id="description" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </div>
      </form>
    </div>
  )
};