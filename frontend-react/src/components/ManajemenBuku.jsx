import React, { useState, useEffect } from "react";
import TabelBuku from "./TabelBuku";
import axios from "axios";

function ManajemenBuku() {
  const [formMode, setFormMode] = useState("");
  const [books, setBooks] = useState([]);
  const [inputForm, setInputForm] = useState();

  function showCreateForm() {
    setInputForm("");
    setFormMode("create");
  }
  function showEditForm(book) {
    setInputForm(book);
    setFormMode("edit");
  }

  useEffect(() => {
    retrieveData();
  }, []);

  function retrieveData() {
    axios
      .get("http://localhost:4000/book")
      .then((response) => {
        setBooks(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  function handleJudul(e) {
    setInputForm({ ...inputForm, judul: e.target.value });
  }
  function handlePengarang(e) {
    setInputForm({ ...inputForm, pengarang: e.target.value });
  }

  function submitForm(event) {
    event.preventDefault();
    if (formMode === "create") {
      axios
        .post("http://localhost:4000/book/add", inputForm)
        .then(() => {
          alert("Data added successfully");
          retrieveData();
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    if (formMode === "edit") {
      axios
        .put("http://localhost:4000/book/update/" + inputForm._id, inputForm)
        .then(() => {
          retrieveData();
          alert("Data changed successfully");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }

  function deleteOne(book) {
    axios
        .delete("http://localhost:4000/book/delete/" + book._id)
        .then(() => {
          retrieveData();
          alert("Data deleted successfully");
        })
        .catch((error) => {
          console.log(error.response);
        });
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center">Book Management</h1>
      <button className="btn btn-sm btn-primary my-2" onClick={showCreateForm}>
        Add Book
      </button>
      {formMode !== "" && (
        <div id="form" className="card py-2 my-2 bg-secondary">
          <div className="card-body">
            <h4>Book Form</h4>
            <form className="row" onSubmit={submitForm}>
              <div className="col-6">
                <input
                  type="text"
                  name="judul"
                  className="form-control mx-2"
                  placeholder="Title"
                  value={inputForm.judul || ""}
                  onChange={handleJudul}
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  name="pengarang"
                  className="form-control mx-2"
                  placeholder="Author"
                  value={inputForm.pengarang || ""}
                  onChange={handlePengarang}
                />
              </div>
              <div className="col-2">
                <input
                  type="submit"
                  className="btn btn-success"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      <TabelBuku showEdit={showEditForm} books={books} requestToDelete={deleteOne}/>
    </div>
  );
}

export default ManajemenBuku;
