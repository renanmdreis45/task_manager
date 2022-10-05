import React from "react";
import { isPropertySignature } from "typescript";
import "./Modal.css";

export default function Modal(props: any) {
    return (
        <div
            className="modal"
            onClick={() => {props.onClose ? props.onClose() : ""}}
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