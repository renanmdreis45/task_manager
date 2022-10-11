import React from "react";
import { isPropertySignature } from "typescript";
import "./Modal.css";

export default function Modal(props: any) {

    const toggleModal = () => {
        if(props.onClose) {
            props.onClose = props.onClose;
        } else {
            props.onClose = "";
        }
    }

    return (
        <div
            className="modal"
            onClick={toggleModal}
        >
            <div
                className="modal-content custom-scroll"
                onClick={(event) => event.stopPropagation()}
            >

                {props.children}

            </div>

        </div>
    )
}