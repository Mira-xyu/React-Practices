import { useState } from "react";
import "./AccordionItem.css";

interface Props {
  title: string;
  content: string;
  id: string;
}

function AccordionItem({ title, content, id }: Props) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${id}`}
          aria-expanded="false"
          aria-controls={`collapse-${id}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`collapse-${id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading-${id}`}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">{content}</div>
      </div>
    </div>
  );
}

export default AccordionItem;
