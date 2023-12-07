import React, { useCallback, useEffect, useState, useRef } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Page = () => {
  const notify = () => toast("Copied To Clipboard");
  const [length, setlength] = useState(8);
  const [abcd, setabcd] = useState(false);
  const [characters, setcharacters] = useState(false);
  const [password, setpassword] = useState("");
  const passwordgenerator = useCallback(
    (e) => {
      let pass = "";
      let numbers = "1234567890";
      let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let charact = "~!@#$%&*_-?";

      for (let i = 0; i < length; i++) {
        let random = Math.floor(Math.random() * numbers.length);

        if (abcd) {
          numbers += abc;
        }
        if (characters) {
          numbers += charact;
        }

        let chk = numbers.charAt(random);
        pass += chk;
      }

      setpassword(pass);
    },
    [length, abcd, characters]
  );
  useEffect(() => {



    // const inputElement = refHook.current;

    // if (inputElement) {
    //   inputElement.focus();
    // }






    passwordgenerator();
  }, [length, abcd, characters]);

  const refHook = useRef(null);
    const copy = () => {
    refHook.current?.select();
    const inputElement = refHook.current;
    if (inputElement) {
        inputElement.focus();
      }
    refHook.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  };
  return (
    <>
      <h1 className="my-5"> Generate Password:</h1>
      <div className="container main p-3 ">
        <div className="content my-5">
          <div className="input1">
            <input
              className="inppass px-3 py-1"
              type="text"
              value={password}
              ref={refHook}
              placeholder="Password"
            />
            <button
              className="btn button m-2 "
              onClick={() => {
                copy();
                notify();
              }}
            >
              COPY
             
            </button>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
          </div>
          <div className="range ">
            <div className="check mt-3">
              <input
                type="range"
                className="my-3"
                max={50}
                min={6}
                value={length}
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />{" "}
              <label className="mx-2" htmlFor="range">
                {" "}
                Length: {length}{" "}
              </label>
            </div>
            <div className="check">
              <input
                className=" checkbox my-4"
                type="checkbox"
                defaultChecked={abcd}
                onChange={() => {
                  setabcd((prev) => !prev);
                }}
                id="alphabet"
              />{" "}
              <label className="mx-2" htmlFor="alphabet">
                Alphabets
              </label>{" "}
              <br />
            </div>
            <div className="check">
              <input
                type="checkbox"
                class="checkbox"
                defaultChecked={characters}
                onChange={() => {
                  setcharacters((prev) => !prev);
                }}
                id="characters"
              />{" "}
              <label className="mx-2" htmlFor="characters">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
